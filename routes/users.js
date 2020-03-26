const { User, validate } = require('../models/user');
const express = require('express');
const db = require('../db')
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const router = express.Router();

const insertStatement = 'insert into users (email, name, hash, roles) values ($1, $2, $3, $4) returning email, name, roles;'

//Registrieren eines neuen Benutzers
router.post('/', async (req, res) => {
   const { error } = validate(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   const user = new User(
      req.body.email, 
      req.body.name, 
      req.body.password, 
      ['user']
   );

   try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      const res = await db.query(insertStatement, [user.email, user.name, user.password, user.roles])
      console.log(res.rows[0])
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

module.exports = router;