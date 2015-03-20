/**
* Petition_action.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  attributes: {
    first_name: 'string',
    last_name: 'string',
    email: 'string',
    dob: 'string',
    location: 'array',
    state: 'string',
    postcode: 'integer',
    address: 'string',
    ip: 'ip',
    image: 'string',
    custom: 'json',       
    action: {
      model: 'action'
    },
    // user: {
    //   model: 'user'
    // },
    campaign: {
      model: 'campaign' 
    }
  }
};

