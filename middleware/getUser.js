const jwt = require('jsonwebtoken');
const config = require('config');
const cookie = require('cookie');

function getUser(req, res, next)
{
   const cookies = cookie.parse(decodeURIComponent(req.headers.cookie));
   const token = cookies.jwt;
   if(!token)
   {
      req.user = null;
      next();
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
      next();
      return;
   }
}

module.exports = getUser;