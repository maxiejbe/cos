/**
 * isClientRole
 *
 * @description :: Policy to check if decoded user has client role
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

//Maybe an env variable would be OK
const CLIENT_ROLE = 'client';

module.exports = function (req, res, next) {
  if (req.token.role === CLIENT_ROLE) return next();
  return res.json(401, {err: 'Role is not allowed to perform this action!'});
};