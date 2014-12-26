/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!documentation/
 */

 var loggedIn = ['tokenAuth'];
 var campOwner = ['tokenAuth', 'ownCampaign'];
 var userOwner = ['tokenAuth', 'ownUser'];


module.exports.policies = {
  
  // (`true` allows public access)
  
  '/': true,
  '*': false,

  'UserController': {
    'findOne': userOwner,
    'update': userOwner,
    '*': false
  },

  'AuthController': {
    'login': true,
    'signup': true,
    '*': false
  },

  'CampaignController': {
    'find': campOwner,
    'create': loggedIn,
    'update': campOwner,
    'destroy': campOwner,
    'addAdmin': campOwner,
    'removeAdmin': campOwner,
    '*': false
  },

  'ActionController': {
    'find': campOwner,
    'create': campOwner,
    'update': campOwner,
    'destroy': campOwner,
    '*': false
  },

  // 'PetitionController': {
  //   'find': ['tokenAuth', 'campaignAdmin'],
  //   'create': ['tokenAuth'],
  //   'update': ['tokenAuth', 'campaignAdmin'],
  //   'destroy': ['tokenAuth', 'campaignAdmin'],
  //   'addAdmin': ['tokenAuth', 'campaignAdmin'],
  //   'removeAdmin': ['tokenAuth', 'campaignAdmin'],
  //   '*': false
  // }


};
