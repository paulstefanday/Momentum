angular.module('MyApp')
  .factory('Account', function($http, $auth) {
    var userId = $auth.getPayload().sid;
    return {
      getProfile: function() {
        return $http.get('/user/'+ userId);
      },
      updateProfile: function(profileData) {
        return $http.put('/user/'+ userId, profileData);
      }
    };
  });