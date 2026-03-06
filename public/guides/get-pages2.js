const puppeteer = require('/Applications/MAMP/htdocs/lunar-reddit-scanner/node_modules/puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const filePath = path.resolve(__dirname, 'astrocartography-guide.html');
    await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });

    // Generate PDF and save it
    const pdfPath = path.resolve(__dirname, 'How to Read Your Astrocartography Chart — Lunar Playground.pdf');
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', right: '18mm', bottom: '24mm', left: '18mm' },
        displayHeaderFooter: true,
        headerTemplate: '<span></span>',
        footerTemplate: '<div style="width:100%;text-align:center;font-family:Helvetica,sans-serif;font-size:8pt;color:#bbb;letter-spacing:1px;"><span class="pageNumber"></span></div>',
    });

    // A4 = 297mm height, margins top 20mm + bottom 24mm = 44mm, content = 253mm
    // At 96 DPI: 253mm = 253 * 96/25.4 ≈ 955px content per page
    // But Puppeteer uses 96 CSS px per inch
    // A4 total = 297mm = 297/25.4*96 = 1122.5px
    // With header/footer space taken by displayHeaderFooter, effective is slightly less
    // Let's use the actual body height and known page count to calculate

    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log('Body height:', bodyHeight, 'px');
    
    // Read PDF to count pages
    const fs = require('fs');
    const pdfData = fs.readFileSync(pdfPath, 'latin1');
    // Count page objects more reliably
    const matches = pdfData.match(/\/Type\s*\/Page(?!\s*s)/g);
    console.log('PDF page regex matches:', matches ? matches.length : 0);
    
    // Alternative: count by endstream which correlates to pages
    // Let's just open it and check manually
    
    console.log('\nSection positions (px from top):');
    const sections = await page.evaluate(() => {
        const h2s = document.querySelectorAll('h2');
        return Array.from(h2s).map(h => ({
            text: h.textContent.trim(),
            top: h.getBoundingClientRect().top
        }));
    });
    
    // Cover page takes about 714px (min-height: 100vh at default viewport = 600px, but with content probably more)
    // Let's estimate: each content page ≈ 955px of content
    // Cover = page 1 (everything up to ~first page break)
    // Then content pages start
    
    const coverEnd = 714; // approx where cover ends
    const contentPerPage = 955; // estimated content height per A4 page with margins
    
    sections.forEach(s => {
        let pg;
        if (s.top < coverEnd) {
            pg = 1;
        } else {
            pg = Math.ceil((s.top - coverEnd) / contentPerPage) + 1; // +1 for cover
        }
        // Add 1 more because At a Glance is its own page div, TOC is its own page div
        console.log(`  Page ~${pg}: "${s.text}"`);
    });
    
    await browser.close();
})();
