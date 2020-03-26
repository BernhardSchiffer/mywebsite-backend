const Joi = require('joi');
const jwt = require('jsonwebtoken');

class User {
   constructor(email, name, password, roles) {
      this.email = email;
      this.name = name;
      this.password = password;
      this.roles = roles;
   }

   generateAuthToken() {
      const token = jwt.sign({ name: this.name, email: this.email, roles: this.roles }, process.env.jwtPrivateKey);
      return token;
   }
}

function validate(user) {
   const schema = 
   {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
   };

   return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validate;