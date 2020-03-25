const { User } = require('../models/user');
const express = require('express');
const db = require('../db')
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const _ = require('lodash');
const router = express.Router();

const selectStatment = 'select email, name, hash, roles from users where email = $1;'

//Anmeldung eines Benutzers
router.post('/', async (req, res) => {
   const { error } = validate(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   const user = await getUser(req.body.email);

   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if (!validPassword) {
      return res.status(400).send('Invalid email or password.');
   }

   const token = user.generateAuthToken();

   res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
});

async function getUser(email) {

   try {
      const res = await db.query(selectStatment, [email]);
      const user = await new User(res.rows[0].email, res.rows[0].name, res.rows[0].hash, res.rows[0].roles);
      return user;
   }
   catch(err) {
      console.error(err);
      return res.status(400).send('Invalid email or password.');
   }

}

function validate(req) {
   const schema =
   {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
   };

   return Joi.validate(req, schema);
}

module.exports = router;