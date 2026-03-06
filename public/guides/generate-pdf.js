const puppeteer = require('/Applications/MAMP/htdocs/lunar-reddit-scanner/node_modules/puppeteer');
const { PDFDocument } = require('/Applications/MAMP/htdocs/lunar-playground/node_modules/pdf-lib');
const path = require('path');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    const filePath = path.resolve(__dirname, 'astrocartography-guide.html');
    await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });

    const margins = { top: '20mm', right: '18mm', bottom: '20mm', left: '18mm' };

    // Pass 1: No header/footer (clean cover)
    const coverPdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: margins,
        displayHeaderFooter: false,
    });

    // Pass 2: With page numbers
    const contentPdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: margins,
        displayHeaderFooter: true,
        headerTemplate: '<span></span>',
        footerTemplate: `
            <div style="width: 100%; text-align: center; font-family: Helvetica, sans-serif; font-size: 8pt; color: #bbb; letter-spacing: 1px;">
                <span class="pageNumber"></span>
            </div>
        `,
    });

    // Merge: page 1 from pass 1 (no footer) + pages 2+ from pass 2 (with footer)
    const coverDoc = await PDFDocument.load(coverPdf);
    const contentDoc = await PDFDocument.load(contentPdf);
    const mergedDoc = await PDFDocument.create();

    const [coverPage] = await mergedDoc.copyPages(coverDoc, [0]);
    mergedDoc.addPage(coverPage);

    const contentPageCount = contentDoc.getPageCount();
    for (let i = 1; i < contentPageCount; i++) {
        const [pg] = await mergedDoc.copyPages(contentDoc, [i]);
        mergedDoc.addPage(pg);
    }

    const mergedBytes = await mergedDoc.save();
    const outPath = path.resolve(__dirname, 'How to Read Your Astrocartography Chart — Lunar Playground.pdf');
    fs.writeFileSync(outPath, mergedBytes);

    console.log(`PDF generated: ${mergedDoc.getPageCount()} pages → ${outPath}`);
    await browser.close();
})();
