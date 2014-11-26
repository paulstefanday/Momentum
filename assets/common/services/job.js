angular.module('MyApp')
  .factory('Job', function($http, $auth) {
    return {
      getFeed: function(limit) {
        return $http.get('/api/jobs/all');
      },
      getFav: function(limit) {
        return $http.get('/api/jobs/favorites');
      },
      addFav: function(data) {
        return $http.post('/api/jobs/favorites', data);
      },
      deleteFav: function(data) {
        return $http.delete('/api/jobs/favorites', data);
      },
      getJobs: function(limit) {
        return $http.get('/api/jobs/');
      },
      getJob: function(id) {
        return $http.get('/api/jobs/' + id);
      },
      addJob: function(data) {
        return $http.post('/api/jobs/', data);
      },
      updateJob: function(data) {
        return $http.put('/api/jobs/' + data.id, data);
      },
      deleteJob: function(id) {
        return $http.delete('/api/jobs/' + id);
      }
    };
  });