/**
 * filterContactByUser
 *
 * @description :: Policy to check if email already exists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

const CLIENT_ROLE = 'client';

module.exports = function (req, res, next) {
  if (req.token.role === CLIENT_ROLE){
    req.query.where = {
        user: req.token.id
    };
  }
  return next();  
};