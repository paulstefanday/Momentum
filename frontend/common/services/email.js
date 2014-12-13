angular.module('MyApp')
  .factory('Email', Email);

Email.$inject = ['$http', '$auth'];

function Email($http, $auth) {
    return {
		subscribe: subscribe
    };

    function subscribe(user) {
		return $http.post('/subscribe/', user);
	}
}