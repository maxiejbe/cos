/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var request = require('request');
var fs = require('fs');

module.exports = {
  
  search: function(req, res) {
    
    let where = {};
    
    let query = req.query.query;
    if (typeof query !== 'undefined' && query !== null){
      where.or = [
        { code: { 'contains': query} },
        { name: { 'contains': query} }
      ];
    }

    let category = req.query.category;
    if (category && category.length){
      where.category = category;
    }
    
    let skip = req.query.skip;
    if (typeof skip == 'undefined' || skip == null){
      skip = DEFAULT_SKIP;
    }
    
    let limit = req.query.limit;
    if (typeof limit == 'undefined' || limit == null){
      limit = DEFAULT_LIMIT;
    }
    
    return Product.find({
      where: where,
      skip: skip,
      limit: limit,
      sort: 'name ASC'
    }).populate('category')
      .exec(function(err, products){
        return res.ok(products);
    });    
  }
};

