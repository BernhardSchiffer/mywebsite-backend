const { Message } = require('../models/message');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

router.post('/zeltlager',async (req, res) =>
{
   const { error } = validateMessage(req.body);
   if(error)
   {
      return res.status(400).send(error.details[0].message);
   }

   const msg = new Message(
      'zeltlager',
      req.body.email,
      req.body.name,
      req.body.question
   );

   try
   {
      await msg.save();
   }
   catch(exception)
   {
      console.log(exception);
   }

   res.status(200).send();
});

router.post('/contactform',async (req, res) =>
{

   const { error } = validateMessage(req.body);
   if(error)
   {
      return res.status(400).send(error.details[0].message);
   }

   const msg = new Message(
      req.body.subject,
      req.body.email,
      req.body.name,
      req.body.question
   );

   try
   {
      await msg.save();
   }
   catch(exception)
   {
      console.log(exception);
      return res.status(500).send('something went wrong.');
   }

   res.status(200).send();
});

function validateMessage(question)
{
   const schema =
   {
      subject: Joi.string(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      question: Joi.string().required()
   };

   return Joi.validate(question, schema);
}

module.exports = router;