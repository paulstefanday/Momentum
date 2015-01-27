angular.module('momentum')
  .factory('Account', Account);

Account.$inject = ['$http', '$auth', '$alert']

function Account($http, $auth, $alert) {

    return {
      find: find,
      update: update,
      profile: profile,
      logout: logout,
      hasAuth: hasAuth
    };

    function find() {
      var userId = $auth.getPayload().sub;
      return $http.get('/user/'+ userId).error(function(error) {
          $alert({ content: JSON.stringify(error) });
        });
    }

    function update(profileData) {
      var userId = $auth.getPayload().sub;
      return $http.put('/user/'+ userId, profileData).then(function() {
        $alert({ content: 'Profile has been updated' });
      }).catch(function(response) {
        $alert({ content: 'Update failed' });
      });
    }

    function profile(profileData) {
      var userId = $auth.getPayload().sub;
      return $http.put('/user/'+ userId, profileData);
    }

    function logout() {
      $auth.logout().then(function() { $alert({ content: 'You have been logged out' }); });
    }

    function hasAuth() {
      return $auth.isAuthenticated();
    }
}