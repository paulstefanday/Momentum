angular
  .module('MyApp')
  .factory('Action', Action);

Action.$inject = ['$http', '$auth', '$stateParams'];

function Action($http, $auth, $stateParams) {
    return {
      find: find,
      findOne: findOne,
      create: create,
      update: update,
      destory: destory
    };

    function find() {
        return $http.get('/campaign/' + $stateParams.id + '/');
    }

    function findOne(id) {
        return $http.get('/campaign/' + $stateParams.id + '/' + id);
    }

    function create(action) {
        return $http.post('/campaign/' + $stateParams.id + '/' + action.type, action);
    }

    function update(action) {
        return $http.put('/campaign/' + $stateParams.id + '/' + action.type + '/'  + action.id , action);
    }

    function destory(id) {
        return $http.delete('/action/' + id);
    }

  }