const mustache = require('mustache');
const juice = require('juice');
const fs = require('fs');

async function generateHTML(templateName, data = {}) {

   const template = await fs.readFileSync(`${__dirname}/../mail/${templateName}.html`, 'utf8');
   
   const html = mustache.render(template, { data });
   const inlineHTML = juice(html);
   return inlineHTML;
}

module.exports = generateHTML;