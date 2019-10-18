const browser = require('browser-detect');

function detectBrowser(req, res, next) {
   req.browser = browser(req.headers['user-agent']);

   if (req.browser.name == "ie") {
      req.browser.name = "Internet Explorer"
      res.render(__dirname + '../views/browser.html', { browser: req.browser });
      return;
   }
   next();
}

module.exports = detectBrowser;