angular.module('MyApp')
  .factory('Account', function($http, $auth) {
    return {
      find: function() {
        var userId = $auth.getPayload().sub;
        return $http.get('/user/'+ userId);
      },
      update: function(profileData) {
        var userId = $auth.getPayload().sub;
        return $http.put('/user/'+ userId, profileData);
      },
      profile: function(profileData) {
        var userId = $auth.getPayload().sub;
        return $http.put('/user/'+ userId, profileData);
      }
    };
  });