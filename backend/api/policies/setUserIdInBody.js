/**
 * setUserIdInBody
 *
 * @description :: Set user id in body
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
  req.body.user = req.token.id;
  next();  
};