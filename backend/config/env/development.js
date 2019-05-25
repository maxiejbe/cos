/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
    connection: 'localServer'
  },

  AUTH_ACCOUNT_EMAIL: 'cos@gmail.com',
  AUTH_ACCOUNT_PASSWORD: 'cospassword',

  SENDGRID_EMAIL_SENDER: 'cos@gmail.com',
  SENDGRID_EMAIL_CONTACT: 'cos@gmail.com',
  SENDGRID_CONTACT_EMAIL_SUBJECT: 'Cos - Contacto',

  FRONTEND_URL: 'http://localhost:3000',

  port: 1337
};
