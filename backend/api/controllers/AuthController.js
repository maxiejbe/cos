/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

const REQUIRED_USERNAME_PASSWORD = 'El usuario y la password son requeridos.';
const INVALID_USERNAME_PASSWORD = 'Usuario o password inválido.';
const FORBIDDEN_ACCESS = 'Se denegó el acceso al usuario.';

module.exports = {
  authResponse: function (req, res, user) {
    return res.json({
      user: user,
      token: jwToken.issue({ id: user.id, role: user.role })
    });
  },

  index: function (req, res) {
    var email = req.body.email || req.body.username;
    var password = req.body.password;

    if (!email || !password) {
      return res.json(401, { err: REQUIRED_USERNAME_PASSWORD });
    }

    User.findOne({ email: email }, function (err, user) {
      if (!user) {
        return res.json(401, { err: INVALID_USERNAME_PASSWORD });
      }

      User.comparePassword(password, user, function (err, valid) {
        if (err) {
          return res.json(403, { err: FORBIDDEN_ACCESS });
        }

        if (!valid) {
          return res.json(401, { err: INVALID_USERNAME_PASSWORD });
        }

        return sails.controllers.auth.authResponse(req, res, user);
      });
    })
  }
};