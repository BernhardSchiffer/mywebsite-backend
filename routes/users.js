const { User, validate } = require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const router = express.Router();

//Registrieren eines neuen Benutzers
router.post('/', async (req, res) => {
   const { error } = validate(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   let user = await User.findOne({ email: req.body.email });
   if (user) {
      return res.status(400).send('User already registered.');
   }

   user = new User(req.body, _.pick(['name', 'email', 'password']));
   user.roles = 'user';

   try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      user = await user.save();
   }
   catch (exception) {
      console.log(exception);
   }
   const token = user.generateAuthToken();

   //sending an email to verify the users email address


   res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
});

module.exports = router;