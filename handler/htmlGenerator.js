const mustache = require('mustache');
const juice = require('juice');

function generateHTML(template, data = {}) {
   const html = mustache.render(template, { data });
   const inlineHTML = juice(html);
   return inlineHTML;
}

module.exports = generateHTML;