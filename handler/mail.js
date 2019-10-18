const nodemailer = require('nodemailer');
const config = require('config');
const htmlToText = require('html-to-text');
const Mustache = require('mustache');
const mustache = require('mustache-express');
const fs = require('fs');
const htmlGenerator = require('./htmlGenerator');
const pdfGenerator = require('./pdfGenerator');

const transport = nodemailer.createTransport({
   host: config.get('mailHost'),
   port: config.get('mailPort'),
   auth: {
      user: config.get('mailUser'),
      pass: config.get('mailPassword')
   }
});

exports.send = async (options) => {
   // build Email
   const emailTemplate = await fs.readFileSync(`${__dirname}/../mail/${options.emailTemplate}.html`, 'utf8');
   const emailHTML = await htmlGenerator(emailTemplate, options.registration);
   const emailText = await htmlToText.fromString(emailHTML);

   // build Attachment
   const attachmentTemplate = await fs.readFileSync(`${__dirname}/../mail/${options.attachmentTemplate}.html`, 'utf8');
   const attachmentHTML = await htmlGenerator(attachmentTemplate, options.registration)
   const pdf = await pdfGenerator(attachmentHTML);

   const mailOptions = {
      from: options.from,
      to: options.user.email,
      subject: options.subject,
      html: emailHTML,
      text: emailText,
      attachments: [
         {
            filename: options.attachmentName,
            content: pdf
         }]
   };

   return transport.sendMail(mailOptions);
}