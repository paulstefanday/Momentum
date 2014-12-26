angular
  .module('momentum')
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
        return $http.get('/campaign/' + $stateParams.id + '/action');
    }

    function findOne(id) {
        return $http.get('/campaign/' + $stateParams.id + '/action/' + id);
    }

    function create(action) {
        return $http.post('/campaign/' + $stateParams.id + '/action', action);
    }

    function update(action) {
        return $http.put('/campaign/' + $stateParams.id + '/action/'  + action.id , action);
    }

    function destory(id) {
        return $http.delete('/action/' + id);
    }

  }