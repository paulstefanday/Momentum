angular.module('momentum')
  .factory('Email', Email);

Email.$inject = ['$http', '$auth', '$alert'];

function Email($http, $auth, $alert) {
    return {
		subscribe: subscribe
    };

    function subscribe(user) {
		return $http.post('/email/subscribe/', user).catch(function(response) {
              $alert({ content: JSON.stringify(response) });
        });
	}
}