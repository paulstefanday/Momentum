angular
  .module('MyApp')
  .factory('Action', Action);

Action.$inject = ['$http', '$auth', '$stateParams'];

function Action($http, $auth, $stateParams) {
    return {
      find: find,
      create: create,
      update: update,
      destory: destory
    };

    function find() {
        return $http.get('/campaign/');
    }

    function create(action) {
        return $http.post('/campaign/' + $stateParams.id + '/' + action.type, action);
    }

    function update(action) {
        return $http.put('/campaign/' + $stateParams.id + '/' + action.type + '/'  + action.id , campaign);
    }

    function destory(id) {
        return $http.delete('/campaign/' + id);
    }

  }