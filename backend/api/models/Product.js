/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  types: {
    stringArray: function (array) {
      if (!Array.isArray(array)) {
        return false;
      } else {
        return array.every(function (value) {
          return typeof (value) === "string"
        });
      }
    }
  },
  attributes: {
    code: {
      type: 'string',
      size: 10,
      required: true
    },
    name: {
      type: 'string',
      size: 100,
      required: true
    },
    description: {
      type: 'text',
      required: false
    },
    category: {
      model: 'category',
      required: false,
      columnName: 'category_id',
      //index: true,
    },
    priceWithoutDiscount: {
      type: 'float',
      required: false
    },
    price: {
      type: 'float',
      required: false
    },
    manual: {
      type: 'text',
    },
    images: {
      type: 'array',
      stringArray: true
    },
    slug: {
      type: 'slug',
      from: 'name'
    },
    enabled: {
      type: 'boolean',
      defaultsTo: false,
    },
    wheelSize: {
      type: 'integer',
      required: false
    },
    deliveryPrice50km: {
      type: 'float',
      required: false
    },
    deliveryPrice350km: {
      type: 'float',
      required: false
    },
    deliveryPrice800km: {
      type: 'float',
      required: false
    },
    deliveryPriceRestCountry: {
      type: 'float',
      required: false
    }
  }
};

