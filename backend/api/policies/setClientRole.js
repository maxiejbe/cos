/**
 * setClientRole
 *
 * @description :: Set client role to user
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
  req.body.role = 'client';
  next();  
};