/**
 * sendGrid
 * TODO: Rename sendGrid to mailing, as we're sending via nodemailer now.
 * @description :: Sendgrid functions to send emails
 */

const nodemailer = require('nodemailer');
const stringUtils = require('./stringUtils');

createTransporter = function () {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: sails.config.AUTH_ACCOUNT_EMAIL,
      pass: sails.config.AUTH_ACCOUNT_PASSWORD
    }
  });
  return transporter;
};

const transporter = createTransporter();

module.exports.sendContactEmail = function (contactData) {
  let contactMessage = 'Nombre: {0}<br><br>Email: {1}<br><br>Tel: {2}<br><br>Asunto: {3}<br><br>Mensaje: {4}'
    .format(contactData.name, contactData.email, contactData.phone ? contactData.phone : '-', contactData.subject, contactData.message);

  const msg = {
    to: sails.config.SENDGRID_EMAIL_CONTACT,
    from: sails.config.AUTH_ACCOUNT_EMAIL,
    subject: sails.config.SENDGRID_CONTACT_EMAIL_SUBJECT,
    html: contactMessage,
  };

  return transporter.sendMail(msg, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });

};
