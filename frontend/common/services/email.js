angular.module('MyApp')
  .factory('Email', function($http, $auth) {
    return {
      subscribe: function(user) {
        return $http.post('/subscribe/', user);
      }
    };
  });