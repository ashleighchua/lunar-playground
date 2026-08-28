/**
 * Relocation report — PDF renderer.
 *
 * Renders a ReportContent object to a finished branded PDF via headless
 * Chrome, using the same two-pass cover/footer + two-pass ToC-page-number
 * technique originally built for manual Fiverr fulfillment
 * (scripts/relocation-report/render.ts), with two fixes for running as a
 * Workflow DevKit step in a Vercel Function rather than a local CLI script:
 *
 * 1. `pdftotext` (a Homebrew system binary the original script shelled out
 *    to for the ToC page-number lookup) doesn't exist in a Vercel serverless
 *    function — replaced with pdfjs-dist's Node build, a pure-JS PDF text
 *    extractor bundled as a normal dependency.
 * 2. `getBrowser()` always launches and closes a fresh browser within one
 *    call — never a module-level cached singleton. Fluid Compute reuses warm
 *    function instances across concurrent requests; a cached Puppeteer
 *    instance shared across concurrent invocations is a documented source of
 *    "Target page, context or browser has been closed" failures.
 */
import { readFileSync } from 'fs';
import path from 'path';
import type { Browser } from 'puppeteer-core';
import { PDFDocument } from 'pdf-lib';
import { renderReportHtml, buildTocEntries, type ReportContent, type TocEntry } from './template';
import { renderNatalReportHtml, buildNatalTocEntries, type NatalReportContent } from './natalTemplate';

// Pinned to match @sparticuz/chromium-min@149.0.0's bundled Chromium build.
// This pair drifts as Chrome releases roll forward — re-check
// https://pptr.dev/chromium-support before bumping either package, and keep
// them in lockstep (this comment, package.json, and the CHROMIUM_PACK_URL
// major version below all need to move together).
//
// Release assets are architecture-specific (found via a live 404 — the
// generic `chromium-v149.0.0-pack.tar` name doesn't exist): x64 for Vercel
// Functions' default runtime, arm64 only if the function is explicitly
// configured for it.
const CHROMIUM_PACK_URL =
  'https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-pack.x64.tar';

async function getBrowser(): Promise<Browser> {
  if (process.env.VERCEL) {
    const chromium = (await import('@sparticuz/chromium-min')).default;
    const puppeteerCore = await import('puppeteer-core');
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(CHROMIUM_PACK_URL),
      headless: true,
    }) as unknown as Browser;
  }
  const puppeteer = (await import('puppeteer')).default;
  const browser = await puppeteer.launch({ headless: true });
  return browser as unknown as Browser;
}

async function buildMergedPdf(rawHtml: string, browser: Browser, logoDataUri: string): Promise<Uint8Array> {
  const html = rawHtml.replaceAll('LOGO_SRC', logoDataUri);

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

  // The promo page (like the cover) is a full-bleed `min-height: 297mm` block
  // with `page-break-before: always` and nothing after it in the DOM — so
  // regardless of how many pages the reflowable body content in between
  // takes, it's reliably the LAST page of both renders. Pulling it from
  // contentPdf (rendered with real page margins) left a visible white border
  // around its full-bleed background; pulling it from coverPdf (zero margin,
  // same trick already used for the cover page above) fixes that without a
  // third render pass.
  const contentPageCount = contentDoc.getPageCount();
  for (let i = 1; i < contentPageCount - 1; i++) {
    const [pg] = await mergedDoc.copyPages(contentDoc, [i]);
    mergedDoc.addPage(pg);
  }
  const coverPageCount = coverDoc.getPageCount();
  const [promoPage] = await mergedDoc.copyPages(coverDoc, [coverPageCount - 1]);
  mergedDoc.addPage(promoPage);

  return mergedDoc.save();
}

/** Per-page extracted text, 0-indexed (page 1 = pages[0]). Pure-JS, no system binary. */
async function extractPageTexts(pdfBytes: Uint8Array): Promise<string[]> {
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const doc = await getDocument({ data: pdfBytes }).promise;
  const pages: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    const text = textContent.items.map((item) => ('str' in item ? item.str : '')).join(' ');
    pages.push(text);
  }
  await doc.cleanup();
  return pages;
}

/** Finds, for each ToC entry, the first PDF page (1-indexed) whose extracted text contains its title. */
async function findTocPageNumbers(pdfBytes: Uint8Array, toc: TocEntry[]): Promise<TocEntry[]> {
  const pages = await extractPageTexts(pdfBytes);

  // The ToC page itself lists every entry's title as its own row text, so a
  // naive search matches the ToC page for everything. Skip past it.
  const tocPageIndex = pages.findIndex((pageText) => pageText.includes('Contents'));
  const searchStart = tocPageIndex === -1 ? 0 : tocPageIndex + 1;

  return toc.map((entry) => {
    const relativeIndex = pages.slice(searchStart).findIndex((pageText) => pageText.includes(entry.title));
    const foundIndex = relativeIndex === -1 ? -1 : relativeIndex + searchStart;
    if (foundIndex === -1) {
      return entry;
    }
    return { ...entry, page: foundIndex + 1 };
  });
}

function loadLogoDataUri(): string {
  // process.cwd()-relative rather than __dirname-relative (this module no
  // longer lives next to the repo's scripts/ dir). Next.js's build-time file
  // tracing should bundle this public/ asset alongside the function, since
  // it's a literal, traceable readFileSync path — worth confirming on first
  // deploy rather than assuming, the same class of "works locally, might not
  // in prod" risk the pdftotext fix above addressed for real.
  const logoPath = path.join(process.cwd(), 'public/Images/logo.png');
  const logoBase64 = readFileSync(logoPath).toString('base64');
  return `data:image/png;base64,${logoBase64}`;
}

/**
 * Shared two-pass sequencing: measurement pass with blank ToC page numbers
 * to find where sections land, then a final pass with real page numbers
 * filled in. `buildHtml` renders a document's full HTML for a given ToC
 * (or none, for the very first pass) — this function doesn't know or care
 * what content shape backs it, only that it produces a `TocEntry[]` and an
 * HTML-rendering function from it. Both `renderReportPdf` and
 * `renderNatalReportPdf` below call this with their own `buildHtml` closure.
 */
async function renderTwoPassPdf(options: {
  buildHtml: (toc?: TocEntry[]) => string;
  tocEntries: TocEntry[];
  browser: Browser;
  logoDataUri: string;
}): Promise<Uint8Array> {
  const { buildHtml, tocEntries, browser, logoDataUri } = options;

  const measurementPdf = await buildMergedPdf(buildHtml(tocEntries), browser, logoDataUri);
  const tocWithPages = await findTocPageNumbers(measurementPdf, tocEntries);
  return buildMergedPdf(buildHtml(tocWithPages), browser, logoDataUri);
}

/** Renders a relocation-report ReportContent to a finished PDF. */
export async function renderReportPdf(content: ReportContent): Promise<Uint8Array> {
  const logoDataUri = loadLogoDataUri();
  const browser = await getBrowser();

  try {
    return await renderTwoPassPdf({
      buildHtml: (toc) => renderReportHtml({ ...content, toc }),
      tocEntries: buildTocEntries(content),
      browser,
      logoDataUri,
    });
  } finally {
    await browser.close();
  }
}

/** Renders a standalone Natal Chart Reading NatalReportContent to a finished PDF. */
export async function renderNatalReportPdf(content: NatalReportContent): Promise<Uint8Array> {
  const logoDataUri = loadLogoDataUri();
  const browser = await getBrowser();

  try {
    return await renderTwoPassPdf({
      buildHtml: (toc) => renderNatalReportHtml({ ...content, toc }),
      tocEntries: buildNatalTocEntries(),
      browser,
      logoDataUri,
    });
  } finally {
    await browser.close();
  }
}
