const jwt = require('jsonwebtoken');
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
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
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