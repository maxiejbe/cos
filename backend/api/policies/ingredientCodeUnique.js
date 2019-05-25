/**
 * ingredientCodeUnique
 *
 * @description :: Policy to check if email already exists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

const REQUIRED_CODE_FIELD = 'El código de principio activo es requerido.';
const CODE_ALREADY_EXISTS = 'El código de principio activo ya se encuentra registrado.';

module.exports = function (req, res, next) {
  var code = req.body.code;
  
  if (!code) {
    return res.json(400, {message: REQUIRED_CODE_FIELD});
  }
  Ingredient.findOne({ code: code}, function (err, user) {
    if (user) {
      return res.json(400, {message: CODE_ALREADY_EXISTS});
    }
    return next();
  })  
};