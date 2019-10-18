const Joi = require('joi');
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
   topic: { type: String },
   name: { type: String, required: true },
   email: { type: String, required: true },
   question: { type: String, required: true }
});

const Question = mongoose.model('Question', questionSchema, 'Questions');

function validateQuestion(question)
{
   const schema =
   {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      question: Joi.string().required()
   };

   return Joi.validate(question, schema);
}

exports.Question = Question;
exports.validate = validateQuestion;