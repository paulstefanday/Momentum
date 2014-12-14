angular
  .module('MyApp')
  .factory('Campaign', Campaign);

Campaign.$inject = ['$http', '$auth'];

function Campaign($http, $auth) {
    
    return {
      find: find,
      create: create,
      update: update,
      destory: destory,
      addAdmin: addAdmin,
      removeAdmin: removeAdmin
    };

    function find() {
        return $http.get('/campaign/').error(function(error) {
          $alert({ content: JSON.stringify(error) });
        });
    }

    function create(campaign) {
        return $http.post('/campaign/', campaign).error(function(error) {
          $alert({ content: JSON.stringify(error) });
        });
    }

    function update(campaign) {
        return $http.put('/campaign/' + campaign.id, campaign).error(function(error) {
          $alert({ content: JSON.stringify(error) });
        });
    }

    function destory(id) {
        return $http.delete('/campaign/' + id).error(function(error) {
          $alert({ content: JSON.stringify(error) });
        });
    }

    function addAdmin(campaign, user) {
        return $http.post('/campaign/' + campaign.id + '/admin/' + user.id);
    }

    function removeAdmin(campaign, user) {
        return $http.delete('/campaign/' + campaign.id + '/admin/' + user.id);
    }
  }