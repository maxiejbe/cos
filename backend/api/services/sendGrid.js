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

/*module.exports.sendContactEmail = function (contactData) {
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
};*/

getEmailFooter = function () {
  return '<br><br>* MENSAJE GENERADO AUTOMATICAMENTE, POR FAVOR NO RESPONDA ESTE MAIL.'
}

module.exports.sendResetPasswordEmail = function (email) {
  let recoverPasswordLink = sails.config.FRONTEND_URL + '/recoverpassword';
  let resetPasswordMessage = 'Estimado/a,<br><br>{0}{1}<br><br>{2}<br><br>Saludos{3}'
    .format('Su código para recuperar la password es: ',
      email.hashCode(),
      'Ingrese al siguiente <a href="' + recoverPasswordLink + '">link para cambiar su password.</a>.',
      getEmailFooter());

  const msg = {
    to: email,
    from: sails.config.AUTH_ACCOUNT_EMAIL,
    subject: sails.config.SENDGRID_RESET_PASSWORD_EMAIL_SUBJECT,
    html: resetPasswordMessage,
  };
  return transporter.sendMail(msg, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
};
