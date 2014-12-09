/**
* Campaign.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
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
      delete obj.staff;
      delete obj.admin;
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

