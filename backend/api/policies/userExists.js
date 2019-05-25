/**
 * userExists
 *
 * @description :: Policy to check if user has not been deleted
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

const USER_NOT_EXISTS = 'El usuario ha sido eliminado.'

module.exports = function (req, res, next) {
  User.findOne({id: req.token.id}, function(err, user){
    if (err || !user) {
      return res.json(500, {err: USER_NOT_EXISTS});
    }
    next();
  })  
};