const Joi = require('joi');

class Message {
   constructor(subject, useremail, username, message) {
      this.subject = subject;
      this.useremail = useremail;
      this.username = username;
      this.message = message;
   }

}

function validate(question)
{
   const schema =
   {
      subject: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      question: Joi.string().required()
   };

   return Joi.validate(question, schema);
}

exports.Message = Message;
exports.validate = validate;