const db = require('../db')

const insertStatement = 'insert into messages (topic, useremail, username, message) values ($1, $2, $3, $4);';

class Message {
   constructor(subject, useremail, username, message) {
      this.subject = subject;
      this.useremail = useremail;
      this.username = username;
      this.message = message;
   }
   async save() {
      await db.query(insertStatement, [this.subject, this.useremail, this.username, this.message]);
   }
}

exports.Message = Message;