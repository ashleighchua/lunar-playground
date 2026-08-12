/**
 * Relocation report — PDF renderer.
 *
 * Takes an authored ReportContent JSON file and renders it to a finished
 * branded PDF via headless Chrome (Puppeteer), mirroring the two-pass
 * cover/footer technique already used for guide PDFs in
 * public/guides/generate-pdf.js (page 1 has no footer, subsequent pages get
 * a page-number footer), merged with pdf-lib.
 *
 * Also does a second kind of two-pass rendering, for the table of contents:
 * pass 1 renders with blank page numbers just to measure where things land,
 * pass 2 fills in the real page numbers found via pdftotext and produces the
 * final output. The ToC's own physical size doesn't change between passes
 * (only digits change, not line count), so this is stable.
 *
 * Usage:
 *   npx tsx scripts/relocation-report/render.ts <content.json> <output.pdf>
 */
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { execFileSync } from 'child_process';
import os from 'os';
import path from 'path';
import puppeteer, { type Browser } from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import { renderReportHtml, buildTocEntries, type ReportContent, type TocEntry } from './template';

async function buildMergedPdf(content: ReportContent, browser: Browser, logoDataUri: string): Promise<Uint8Array> {
  const html = renderReportHtml(content).replaceAll('LOGO_SRC', logoDataUri);

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });

  const margins = { top: '14mm', right: '16mm', bottom: '16mm', left: '16mm' };

  const coverPdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
    displayHeaderFooter: false,
  });

  const contentPdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: margins,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `
      <div style="width:100%;text-align:center;font-family:Helvetica,sans-serif;font-size:8pt;color:#bbb;letter-spacing:1px;">
        <span class="pageNumber"></span>
      </div>
    `,
  });

  await page.close();

  const coverDoc = await PDFDocument.load(coverPdf);
  const contentDoc = await PDFDocument.load(contentPdf);
  const mergedDoc = await PDFDocument.create();

  const [coverPage] = await mergedDoc.copyPages(coverDoc, [0]);
  mergedDoc.addPage(coverPage);

  const pageCount = contentDoc.getPageCount();
  for (let i = 1; i < pageCount; i++) {
    const [pg] = await mergedDoc.copyPages(contentDoc, [i]);
    mergedDoc.addPage(pg);
  }

  return mergedDoc.save();
}

/** Finds, for each ToC entry, the first PDF page (1-indexed) whose extracted text contains its title. */
function findTocPageNumbers(pdfBytes: Uint8Array, toc: TocEntry[]): TocEntry[] {
  const tmpPdf = path.join(os.tmpdir(), `toc-measure-${Date.now()}.pdf`);
  writeFileSync(tmpPdf, pdfBytes);
  try {
    const text = execFileSync('pdftotext', ['-layout', tmpPdf, '-'], { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 20 });
    const pages = text.split('\f');

    // The ToC page itself lists every entry's title as its own row text, so a
    // naive search matches page 2 (the ToC) for everything. Skip page 1
    // (cover, blank) and page 2 (the ToC itself) — real content starts at
    // page 3 (index 2).
    const tocPageIndex = pages.findIndex((pageText) => pageText.includes('Contents'));
    const searchStart = tocPageIndex === -1 ? 0 : tocPageIndex + 1;

    return toc.map((entry) => {
      const relativeIndex = pages.slice(searchStart).findIndex((pageText) => pageText.includes(entry.title));
      const foundIndex = relativeIndex === -1 ? -1 : relativeIndex + searchStart;
      if (foundIndex === -1) {
        console.warn(`  [toc] could not find page for "${entry.title}"`);
        return entry;
      }
      return { ...entry, page: foundIndex + 1 };
    });
  } finally {
    unlinkSync(tmpPdf);
  }
}

async function main() {
  const [contentPath, outputPath] = process.argv.slice(2);
  if (!contentPath || !outputPath) {
    console.error('Usage: npx tsx scripts/relocation-report/render.ts <content.json> <output.pdf>');
    process.exit(1);
  }

  const content: ReportContent = JSON.parse(readFileSync(contentPath, 'utf-8'));

  const logoPath = path.resolve(__dirname, '../../public/Images/logo.png');
  const logoBase64 = readFileSync(logoPath).toString('base64');
  const logoDataUri = `data:image/png;base64,${logoBase64}`;

  const browser = await puppeteer.launch({ headless: true });

  try {
    // Pass 1: measurement render with blank page numbers, just to find where things land.
    content.toc = buildTocEntries(content);
    const measurementPdf = await buildMergedPdf(content, browser, logoDataUri);

    console.log('Measuring section page numbers...');
    const tocWithPages = findTocPageNumbers(measurementPdf, content.toc);

    // Pass 2: final render with real page numbers filled in.
    content.toc = tocWithPages;
    const finalPdf = await buildMergedPdf(content, browser, logoDataUri);

    writeFileSync(outputPath, finalPdf);

    const finalDoc = await PDFDocument.load(finalPdf);
    console.log(`PDF generated: ${finalDoc.getPageCount()} pages -> ${outputPath}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
