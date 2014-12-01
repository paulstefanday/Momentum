angular.module('MyApp')
  .factory('Email', function($http, $auth) {
    // var userId = $auth.getPayload().sid;

    return {
      subscribe: function(user) {
        return $http.post('/subscribe/', user);
      }
    };
  });