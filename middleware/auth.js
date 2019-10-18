const jwt = require('jsonwebtoken');
const config = require('config');
const cookie = require('cookie');

function auth(req, res, next)
{
   const cookies = cookie.parse(decodeURIComponent(req.headers.cookie));
   const token = cookies.jwt;
   if(!token)
   {
      res.status(401).send('Accsess denied. No token provided.');
      //res.render('401error');
      return;
   }

   try
   {
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      req.user = decoded;
      next();
   }
   catch (exception)
   {
      res.status(400).send('Invalid token.');
      //res.render('400error');
   }
}

module.exports = auth;