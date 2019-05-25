/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const stringUtils = require('../services/stringUtils')
const sendGrid = require('../services/sendGrid')
const EMAIL_REQUIRED = 'El email es requerido.';

module.exports = {
  resetPassword: function(req, res, user){
    const email = req.body.email;
    if (!email){
      return res.json(500, {err: EMAIL_REQUIRED});
    }

    //sendGrid.sendResetPasswordEmail(email);
    return res.json(200, {});
  }
};

