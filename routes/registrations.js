const { Registration } = require('../models/registration');
const express = require('express');
const Joi = require('joi');
const htmlGenerator = require('../handler/htmlGenerator');
const pdfGenerator = require('../handler/pdfGenerator');
const router = express.Router();
const mail = require('../handler/mail');

router.post('/', async (req, res) => {
   //Eingabe validieren
   const { error } = validateRegistration(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   let registration = new Registration(
      req.body.firstname,
      req.body.lastname,
      req.body.birthday,
      req.body.telefon,
      req.body.email,
      req.body.address,
      req.body.postcode,
      req.body.city,
      req.body.medicine,
      req.body.insurant,
      req.body.insurance,
      req.body.canSwim,
      req.body.VegetarianOrVegan,
      req.body.misc,
      req.body.passengersArrival,
      req.body.passengersDeparture
   );

   try {
      //Anmeldung in Datenbank schreiben
      await registration.save();
   }
   catch (exception) {
      console.log(exception);
   }

   //Anmeldung als Email schreiben
   let birthday = registration.birthday;
   let birthdayString = birthday.getDate() + "." + (birthday.getMonth() + 1) + "." + birthday.getFullYear();

   let arrival;
   let departure;
   if (registration.arrival <= 0) {
      arrival = false;
   }
   else {
      arrival = registration.arrival;
   }
   if (registration.departure <= 0) {
      departure = false;
   }
   else {
      departure = registration.departure;
   }

   let isMisc;
   if (registration.misc == "") {
      isMisc = false;
   }
   else {
      isMisc = true;
   }
   let isVegetarian = false;
   let isVegan = false;
   switch (registration.VegetarianOrVegan) {
      case 'vegan': isVegan = true;
         break;
      case 'vegetarian': isVegetarian = true;
   }

   let registrationMail = {
      firstname: registration.firstname,
      lastname: registration.lastname,
      birthday: birthdayString,
      address: registration.address,
      postcode: registration.postcode,
      city: registration.city,
      telefon: registration.telefon,
      email: registration.email,
      medicine: registration.medicine,
      insurant: registration.insurant,
      insurance: registration.insurance,
      canSwim: registration.canSwim,
      isVegetarian: isVegetarian,
      isVegan: isVegan,
      isMisc: isMisc,
      misc: registration.misc,
      passengersArrival: arrival,
      passengersDeparture: departure
   }

   // build Email
   const emailHTML = await htmlGenerator('registrationmail', registrationMail);

   // build Attachment
   const attachmentHTML = await htmlGenerator('registrationattachment', registrationMail)
   const pdf = await pdfGenerator(attachmentHTML);

   await mail.send({
      from: 'dpsg-otto <info@dpsg-otto.de>',
      to: registration.email,
      subject: 'Anmeldung Zeltlager 2019',
      emailHTML: emailHTML,
      attachments: [{
         content: pdf,
         filename: 'Anmeldung.pdf'
      }]
   });

   res.send(JSON.stringify(registration));
});

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

module.exports = router;