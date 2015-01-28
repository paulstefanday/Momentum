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
    'find': loggedIn,
    // 'findOne': campOwner,
    'create': loggedIn,
    'update': campOwner,
    'destroy': campOwner,
    'addAdmin': campOwner,
    'removeAdmin': campOwner,
    '*': false
  },

  'ActionController': {
    'find': campOwner,
    'findOne': true,
    'feedPublic': true,
    'create': campOwner,
    'update': campOwner,
    'destroy': campOwner,
    '*': false
  },

  'PetitionController': {
    'create': true,
    '*': false
  },

  'EmailController': {
    'subscribe': true,
    '*': false
  },

};
