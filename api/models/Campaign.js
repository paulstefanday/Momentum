/**
* Campaign.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    url: 'string',
    logo: 'string',
    video: 'string',
    colors: 'array',
    twitter: 'string',
    facebook: 'string',
    stripe: 'string',
    petitions: {
      collection: 'petition',
      via: 'owner'
    },
    admin: {
      collection: 'user',
      via: 'admin',
      dominant:true
    },
    staff: {
      collection: 'user',
      via: 'staff',
      dominant:true
    },
    toJSON: function() {
      var obj = this.toObject();
      // delete obj.staff;
      delete obj.stripe;
      return obj;
    }
  },

  beforeUpdate: function(values, cb) {
    // If we are removing the association, the message is not useful anymore
    if (values.user === null) {
      console.log(this.id);
    }

    cb();
  }
};

