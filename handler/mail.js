const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

const transport = nodemailer.createTransport({
   host: process.env.mail_host,
   port: process.env.mail_port,
   auth: {
      user: process.env.mail_user,
      pass: process.env.mail_password
   }
});

exports.send = async (options) => {

   const emailText = await htmlToText.fromString(options.emailHTML);

   const mailOptions = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.emailHTML,
      text: emailText
   };

   if(options.attachments) {
      mailOptions.attachments = options.attachments;
   }

   return await transport.sendMail(mailOptions);
}