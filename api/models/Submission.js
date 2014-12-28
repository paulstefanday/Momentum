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
    profile_image: 'string',
    image: 'string',
    message: 'string',
    voted: 'boolean',
    postcode: 'integer',
    location: 'string',
    url: 'string',
    donation: 'float',
    reward: 'string',
    custom: 'json',
    type: 'string',
    action: {
      model: 'action'
    },
    user: {
      model: 'user'
    },
    campaign: {
      model: 'campaign' 
    }
  }
};

