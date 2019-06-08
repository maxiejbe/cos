/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


// We don't want to store password with out encryption
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true,
      size: 20
    },
    password: {
      type: 'string',
      required: true
    },
    role: {
      type: 'string',
      enum: ['admin', 'client']
    },
    name: {
      type: 'string',
      size: 40,
      required: true
    },
    // We don't wan't to send back encrypted password either
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  hashPassword: function (values, next){
    if(!values.password) return next();
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
        values.password = hash;
        next();
      })
    })
  },
  // Here we encrypt password before creating a User
  beforeCreate : function (values, next) {
    this.hashPassword(values, next);
  },

  beforeUpdate : function (values, next) {
    this.hashPassword(values, next);
  },

  comparePassword : function (password, user, cb) {
    bcrypt.compare(password, user.password, function (err, match) {
      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }
};

