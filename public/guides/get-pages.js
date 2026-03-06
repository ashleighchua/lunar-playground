const puppeteer = require('/Applications/MAMP/htdocs/lunar-reddit-scanner/node_modules/puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const filePath = path.resolve(__dirname, 'astrocartography-guide.html');
    await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });

    // Generate PDF first to get total pages
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', right: '18mm', bottom: '24mm', left: '18mm' },
        displayHeaderFooter: true,
        headerTemplate: '<span></span>',
        footerTemplate: '<div style="width:100%;text-align:center;font-size:8pt;color:#bbb;letter-spacing:1px;"><span class="pageNumber"></span></div>',
    });

    // Count pages from PDF
    const pdfStr = pdfBuffer.toString('latin1');
    const pageCount = (pdfStr.match(/\/Type\s*\/Page[^s]/g) || []).length;
    console.log('Total PDF pages:', pageCount);

    // Get all h2 text and their Y positions on the page
    const sections = await page.evaluate(() => {
        const h2s = document.querySelectorAll('h2');
        return Array.from(h2s).map(h => ({
            text: h.textContent.trim(),
            top: h.getBoundingClientRect().top
        }));
    });

    // Get page height info
    const pageHeight = await page.evaluate(() => {
        return document.querySelector('.page') ? document.querySelector('.page').getBoundingClientRect().height : 0;
    });

    console.log('Sections found:');
    sections.forEach(s => {
        // Rough page estimate: cover=1 page, then each ~1000px of content ≈ 1 page
        console.log(`  "${s.text}" — top: ${Math.round(s.top)}px`);
    });

    await browser.close();
})();
