angular.module('MyApp')
  .factory('Category', function($http, $auth) {
    return {
      getcategory: function(limit) {
        return $http.get('/api/category/');
      },
      getJob: function(id) {
        return $http.get('/api/category/' + id);
      },
      addJob: function(data) {
        return $http.post('/api/category/', data);
      },
      updateJob: function(data) {
        return $http.put('/api/category/' + data.id, data);
      },
      deleteJob: function(id) {
        return $http.delete('/api/category/' + id);
      }
    };
  });