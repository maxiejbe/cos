/**
 * Faq.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
      question: {
        type: 'string',
        size: 100,
        required: true
      },
      answer: {
        type: 'string',
        size: 300,
        required: true
      }
    }
  };
  
  