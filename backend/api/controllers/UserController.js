/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const stringUtils = require('../services/stringUtils')
const sendGrid = require('../services/sendGrid')
const EMAIL_REQUIRED = 'El email es requerido.';
const CODE_REQUIRED = 'Debe ingresar el código enviado por email.';
const CODE_INCORRECT = 'El código ingresado es incorrecto. Revise nuevamente su casilla de email.';
const USER_NOT_EXISTS = 'No existe un usuario con el email especificado.';
const USER_NOT_UPDATED = 'No se pudo actualizar el usuario. Intente nuevamente.';
const PASSWORD_REQUIRED = 'La password es requerida.';


module.exports = {
  resetPassword: function(req, res, user){
    const email = req.body.email;
    if (!email){
      return res.json(500, {err: EMAIL_REQUIRED});
    }

    sendGrid.sendResetPasswordEmail(email);
    return res.json(200, {});
  },
  recoverPassword: function(req, res, user){

    const email = req.body.email;
    const code = req.body.code;
    const password = req.body.password;

    if (!email){
      return res.json(500, {err: EMAIL_REQUIRED});
    }

    if (!code){
      return res.json(500, {err: CODE_REQUIRED});
    }

    if (parseInt(code) !== email.hashCode()){
      return res.json(500, {err: CODE_INCORRECT});
    }

    if (!password){
      return res.json(500, {err: PASSWORD_REQUIRED});
    }

    User.findOne({email: email}, function(err, user){
      if (err || !user){
        return res.json(500, {err: USER_NOT_EXISTS});
      }

      user.password = password;
      User.update({id: user.id}, user, function(err, savedUser){
        if (err || !savedUser){
          return res.json(500, {err: USER_NOT_UPDATED});
        }
        return res.json(200, {});
      })
    })
  }
};

