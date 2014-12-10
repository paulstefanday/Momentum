/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

module.exports = {

  schema: true,

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    first_name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    encryptedPassword: {
      type: 'string'
    },
    admin: {
      collection: 'user',
      via: 'admin'
    },
    staff: {
      collection: 'user',
      via: 'staff'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      // delete obj.staff;
      // delete obj.admin;
      return obj;
    }
  },

  beforeCreate: function(values, next) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) return next(err);

        values.encryptedPassword = hash;
        next();
      });
    });
  },

  validPassword: function(password, user, cb) {
    bcrypt.compare(password, user.encryptedPassword, function(err, match) {
      if (err) cb(err);

      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    });
  }
};

