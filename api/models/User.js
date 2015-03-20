/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt-nodejs');

module.exports = {

  schema: true,

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    first_name: 'string',
    last_name: 'string',
    dob: 'string',
    location: 'array',
    image: 'string',
    facebook: 'string',
    encryptedPassword: 'string',
    admin: {
      collection: 'campaign',
      via: 'admin'
    },
    staff: {
      collection: 'campaign',
      via: 'staff'
    },
    submissions: {
      collection: 'submission',
      via: 'user'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      delete obj.staff;
      delete obj.admin;
      return obj;
    }
  },

  beforeCreate: function(values, next) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(values.password, salt, null, function(err, hash) {
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

