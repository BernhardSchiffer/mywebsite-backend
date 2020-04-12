const puppeteer = require('puppeteer');

async function generatePDF(html) {
   const browser = await puppeteer.launch({ 
         headless: true,
         args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] 
      });
   const page = await browser.newPage();

   await page.setContent(html);
   await page.emulateMedia('screen');
   const pdf = await page.pdf({
      format: 'A4',
      printBackground: true
   });

   await browser.close();
   return pdf;
}

module.exports = generatePDF;