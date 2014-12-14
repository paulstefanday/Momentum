angular
  .module('MyApp')
  .factory('Petition', Petition);

Petition.$inject = ['$http', '$auth'];

function Petition($http, $auth) {
    return {
      find: find,
      create: create,
      update: update,
      destory: destory
    };

    function find() {
        return $http.get('/campaign/');
    }

    function create(campaign) {
        return $http.post('/campaign/', campaign);
    }

    function update(campaign) {
        return $http.put('/campaign/' + campaign.id, campaign);
    }

    function destory(id) {
        return $http.delete('/campaign/' + id);
    }

  }