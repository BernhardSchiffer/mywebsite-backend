const db = require('../db')

const insertStatement = 'insert into registrations'+
                        '(registrationtime, firstname, lastname, birthday, telefon, email, address, postcode, city, medicine, insurant, insurance, canswim, vegetarianorvegan, misc, passengersarrival, passengersdeparture)'+
	                     'values (LOCALTIMESTAMP, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);';

class Registration {
   constructor(
         firstname,
         lastname,
         birthday,
         telefon,
         email,
         address,
         postcode,
         city,
         medicine,
         insurant,
         insurance,
         canSwim,
         VegetarianOrVegan,
         misc,
         passengersArrival,
         passengersDeparture
      ) {
         this.firstname = firstname;
         this.lastname = lastname;
         this.birthday = new Date(birthday);
         this.telefon = telefon;
         this.email = email;
         this.address = address;
         this.postcode = postcode;
         this.city = city;
         this.medicine = medicine;
         this.insurant = insurant;
         this.insurance = insurance;
         this.canSwim = canSwim;
         this.VegetarianOrVegan = VegetarianOrVegan;
         this.misc = misc;
         this.passengersArrival = passengersArrival;
         this.passengersDeparture = passengersDeparture;
      }

      async save() {
         console.log(`saving Registration for ${this.firstname}, ${this.lastname}`);
         await db.query(
            insertStatement,
            [
               this.firstname, 
               this.lastname, 
               this.birthday.toISOString(),
               this.telefon,
               this.email,
               this.address,
               this.postcode,
               this.city,
               this.medicine,
               this.insurant,
               this.insurance,
               this.canSwim,
               this.VegetarianOrVegan,
               this.misc,
               this.passengersArrival,
               this.passengersDeparture
            ]
         );
      }
}

exports.Registration = Registration;