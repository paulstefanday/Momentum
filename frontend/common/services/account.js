angular.module('MyApp')
  .factory('Account', Account);

Account.$inject = ['$http', '$auth']

function Account($http, $auth) {

    return {
      find: find,
      update: update,
      profile: profile
    };

    function find() {
        var userId = $auth.getPayload().sub;
        return $http.get('/user/'+ userId);
    }

    function update(profileData) {
        var userId = $auth.getPayload().sub;
        return $http.put('/user/'+ userId, profileData);
    }

    function profile(profileData) {
        var userId = $auth.getPayload().sub;
        return $http.put('/user/'+ userId, profileData);
    }
}