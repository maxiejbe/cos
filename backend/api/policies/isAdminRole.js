/**
 * isAdminRole
 *
 * @description :: Policy to check if decoded user has admin role
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

const ADMIN_ROLE = 'admin';

module.exports = function (req, res, next) {
  if (req.token.role === ADMIN_ROLE) return next();
  return res.json(401, {err: 'Role is not allowed to perform this action!'});
};