const {Message, validate} = require('../models/message');
const express = require('express');
const router = express.Router();
const db = require('../db')

const insertStatement = 'insert into messages (topic, useremail, username, message) values ($1, $2, $3, $4);';

router.post('/zeltlager',async (req, res) =>
{
   const { error } = validate(req.body);
   if(error)
   {
      return res.status(400).send(error.details[0].message);
   }

   let msg = new Message(
      'zeltlager',
      req.body.email,
      req.body.name,
      req.body.question
   );

   try
   {
      const res = await db.query(insertStatement, [msg.subject, msg.useremail, msg.username, msg.message]);
   }
   catch(exception)
   {
      console.log(exception);
   }

   res.status(200).send();
});

router.post('/contactform',async (req, res) =>
{

   const { error } = validate(req.body);
   if(error)
   {
      return res.status(400).send(error.details[0].message);
   }

   let msg = new Message(
      req.body.subject,
      req.body.email,
      req.body.name,
      req.body.question
   );

   try
   {
      const res = await db.query(insertStatement, [msg.subject, msg.useremail, msg.username, msg.message]);
   }
   catch(exception)
   {
      console.log(exception);
      return res.status(500).send('something went wrong.');
   }

   res.status(200).send();
});

module.exports = router;