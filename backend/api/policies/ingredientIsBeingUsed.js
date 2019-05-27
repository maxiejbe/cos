/**
 * ingredientIsBeingUsed
 *
 * @description :: Policy to check if the active ingredient is being used by a product
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

const INGREDIENT_IS_BEING_USED = 'El principio activo esta siendo usado por un producto.';

module.exports = function (req, res, next) {
  var idIng = req.params.id;
 
  Product.findOne({ ingredient: idIng}, function (err, product) {
    if (product) {
      return res.json(400, {message: INGREDIENT_IS_BEING_USED});
    }
    return next();
  })  
};