const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
   name: { type: String, require: true, minlength: 5, maxlength: 50 },
   email: { type: String, require: true, minlength: 5, maxlength: 255, lowercase: true, unique: true },
   password: { type: String, require: true, minlength: 8, maxlength: 1024 },
   roles: { type: Array, required: true }
});

userSchema.methods.generateAuthToken = function()
{
   const token = jwt.sign({ _id: this._id, name: this.name, email: this.email, roles: this.roles }, process.env.jwtPrivateKey);
   return token;
}

const User = mongoose.model('User', userSchema, 'Users');

function validateUser(user)
{
   const schema = 
   {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
   };

   return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;