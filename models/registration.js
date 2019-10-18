const Joi = require('joi');
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
   firstname: { type: String, required: true },
   lastname: { type: String, required: true },
   birthday: { type: Date, required: true },
   telefon: { type: String, required: true },
   email: { type: String, required: true },
   address: { type: String, required: true },
   postcode: { type: Number, required: true },
   city: { type: String, required: true },
   medicine: String,
   insurant: { type: String, required: true },
   insurance: { type: String, required: true },
   canSwim: Boolean,
   VegetarianOrVegan: String,
   misc: String,
   passengersArrival: Number,
   passengersDeparture: Number
});

const Registration = mongoose.model('Anmeldung', registrationSchema, 'Anmeldungen');

function validateRegistration(registration) {
   const schema =
   {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      birthday: Joi.date().less('1-1-2013').required(),
      telefon: Joi.string().required(),
      email: Joi.string().email().required(),
      address: Joi.string().required(),
      postcode: Joi.number().max(99999).min(10000).required(),
      city: Joi.string().required(),
      medicine: Joi.string().optional().allow(''),
      insurant: Joi.string().required(),
      insurance: Joi.string().required(),
      canSwim: Joi.boolean().required(),
      VegetarianOrVegan: Joi.string(),
      misc: Joi.string().optional().allow(''),
      passengersArrival: Joi.number().min(0).max(10),
      passengersDeparture: Joi.number().min(0).max(10)
   };

   return Joi.validate(registration, schema);
}

exports.Registration = Registration;
exports.validate = validateRegistration;