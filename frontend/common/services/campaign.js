angular.module('MyApp')
  .factory('Campaigns', function($http, $auth) {
    var userId = $auth.getPayload().sid;
    return {
      getAll: function() {
        return $http.get('/user/' + userId + '/campaign');
      },
      create: function(message) {
        return $http.post('/user/' + userId + '/campaign', {title: message});
      },
      remove: function(message) {
        return $http.delete('/user/' + userId + '/campain/' + message.id);
      }
    }
  });