const jwt = require('jsonwebtoken');
const db = require('../db');

const insertStatement = 'insert into users (email, name, hash, roles) values ($1, $2, $3, $4) returning email, name, roles;'

class User {
   constructor(email, name, password, roles) {
      this.email = email;
      this.name = name;
      this.password = password;
      this.roles = roles;
   }

   generateAuthToken() {
      const token = jwt.sign({ name: this.name, email: this.email, roles: this.roles }, process.env.jwtPrivateKey);
      return token;
   }

   async save() {
      const result = await db.query(insertStatement, [this.email, this.name, this.password, this.roles])
      console.log(result.rows[0]);
   }
}

exports.User = User;