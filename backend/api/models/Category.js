/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      size: 100,
      required: true
    },
    parent: {
      model: 'category',
      required: false,
    },
    products: {
      collection: 'product',
      via: 'category'
    },
    childs: {
      collection: 'category',
      via: 'parent'
    },
    featured: {
      type: 'boolean',
      defaultsTo: false,
    },
    slug: {
      type: 'slug',
      from: 'name'
    }
  }
};

