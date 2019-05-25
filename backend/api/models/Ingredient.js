/**
 * Ingredient.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    code: {
      type: 'string',
      size: 6,
      required: true
    },
    name: {
      type: 'string',
      size: 20,
      required: true
    },
    description: {
      type: 'string',
      size: 100,
      required: false
    }
  }
};

