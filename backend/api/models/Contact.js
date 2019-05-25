/**
 * Contact.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      size: 20
    },
    surname: {
      type: 'string',
      required: false,
      size: 20
    },
    email: {
      type: 'email',
      required: true,
      size: 20
    },
    phone: {
      type: 'string',
      required: false,
      size: 15
    },
    message: {
      type: 'text',
      required: true,
      size: 300
    },
  },
  afterCreate: function (values, next) {
    //sendGrid.sendContactEmail(values);
    next();
  },
};
