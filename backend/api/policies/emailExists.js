/**
 * emailExists
 *
 * @description :: Policy to check if email already exists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

const REQUIRED_EMAIL_FIELD = 'El e-mail es requerido.';
const EMAIL_ALREADY_EXISTS = 'El e-mail ya se encuentra registrado.';

module.exports = function (req, res, next) {
  var email = req.body.email;
  
  if (!email) {
    return res.json(401, {err: REQUIRED_EMAIL_FIELD});
  }
  User.findOne({ email: email}, function (err, user) {
    if (user) {
      return res.json(401, {err: EMAIL_ALREADY_EXISTS});
    }
    return next();
  })  
};