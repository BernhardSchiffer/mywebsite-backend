const { User } = require('../models/user');
const express = require('express');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const router = express.Router();



//Registrieren eines neuen Benutzers
router.post('/', async (req, res) => {
   const { error } = validateUser(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   const salt = await bcrypt.genSalt(10);
   const password = await bcrypt.hash(req.body.password, salt);

   const user = new User(
      req.body.email, 
      req.body.name, 
      password, 
      ['user']
   );
   
   try {

      await user.save();
      
    } catch (err) {
      if(err.code == 23505) {
         return res.status(400).send('User already registered.');
      }
      else {
         console.log(err);
         return res.status(500).send('something went wrong.');
      }
    }

   const token = user.generateAuthToken();

   //sending an email to verify the users email address


   res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
});

function validateUser(user) {
   const schema = 
   {
      email: Joi.string().min(5).max(255).required().email(),
      name: Joi.string().min(5).max(50).required(),
      password: Joi.string().min(5).max(255).required()
   };

   return Joi.validate(user, schema);
}

module.exports = router;