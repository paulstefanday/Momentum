angular.module('MyApp')
  .factory('Campaign', function($http, $auth) {
    return {
      find: function() {
        var userId = $auth.getPayload().sub;
        return $http.get('/user/' + userId + '/admin');
      },
      create: function(campaign) {
        var userId = $auth.getPayload().sub;
        return $http.post('/user/' + userId + '/admin', campaign);
      },
      delete: function(campaign) {
        var userId = $auth.getPayload().sub;
        return $http.delete('/user/' + userId + '/admin/' + campaign.id);
      }
    }
  });