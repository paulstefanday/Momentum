angular.module('MyApp')
  .factory('Account', function($http, $auth) {
    return {
      getProfile: function() {
        var userId = $auth.getPayload().sub;
        return $http.get('/user/'+ userId);
      },
      updateProfile: function(profileData) {
        var userId = $auth.getPayload().sub;
        return $http.put('/user/'+ userId, profileData);
      }
    };
  });