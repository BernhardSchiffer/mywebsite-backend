const { Registration, validate } = require('../models/registration');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const mail = require('../handler/mail');

router.post('/', async (req, res) => {
   //Eingabe validieren
   const { error } = validate(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   let registration = new Registration({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday,
      address: req.body.address,
      postcode: req.body.postcode,
      city: req.body.city,
      telefon: req.body.telefon,
      email: req.body.email,
      medicine: req.body.medicine,
      insurant: req.body.insurant,
      insurance: req.body.insurance,
      canSwim: req.body.canSwim,
      VegetarianOrVegan: req.body.VegetarianOrVegan,
      misc: req.body.misc,
      passengersArrival: req.body.passengersArrival,
      passengersDeparture: req.body.passengersDeparture
   });

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

   await mail.send({
      emailTemplate: 'registrationmail',
      attachmentTemplate: 'registrationattachment',
      subject: 'Anmeldung Zeltlager 2019',
      from: 'dpsg-otto <info@dpsg-otto.de',
      user: {
         email: registration.email
      },
      registration: registrationMail,
      attachmentName: 'Anmeldung.pdf'
   });

   res.send(JSON.stringify(registration));
});

module.exports = router;