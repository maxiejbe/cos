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
      size: 100
    },
    email: {
      type: 'email',
      required: true,
    },
    phone: {
      type: 'string',
      required: false,
    },
    subject: {
      type: 'string',
      size: 100,
      required: true
    },
    message: {
      type: 'text',
      required: true,
    },
  },
  afterCreate: function (values, next) {
    sendGrid.sendContactEmail(values);
    next();
  },
};
