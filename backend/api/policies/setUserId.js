/**
 * setUserId
 *
 * @description :: Set user id if object
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
  if (typeof req.body.user === 'object') {
    req.body.user = req.body.user.id;
  }
  next();  
};