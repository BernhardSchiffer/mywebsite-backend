const {Question, validate} = require('../models/question');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/zeltlager',async (req, res) =>
{
   const { error } = validate(req.body);
   if(error)
   {
      return res.status(400).send(error.details[0].message);
   }

   let question = new Question({
      topic: 'zeltlager',
      name: req.body.name,
      email: req.body.email,
      question: req.body.question
   });

   try
   {
      await question.save();
   }
   catch(exception)
   {
      console.log(exception);
   }

   res.status(200).send();
});

module.exports = router;