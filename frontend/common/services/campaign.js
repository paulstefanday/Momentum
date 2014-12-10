angular.module('MyApp')
  .factory('Campaign', function($http, $auth) {
    return {
      find: function() {
        return $http.get('/campaign/');
      },
      create: function(campaign) {
        return $http.post('/campaign/', campaign);
      },
      update: function(campaign) {
        return $http.put('/campaign/' + campaign.id, campaign);
      },
      delete: function(campaign) {
        return $http.delete('/campaign/' + campaign.id);
      },
      addAdmin: function(campaign, user) {
        return $http.post('/campaign/' + campaign.id + '/admin/' + user.id);
      },
      removeAdmin: function(campaign, user) {
        return $http.delete('/campaign/' + campaign.id + '/admin/' + user.id);
      }
    }
  });