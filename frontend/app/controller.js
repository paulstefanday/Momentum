angular.module('momentum')
	.controller('appCtrl', appCtrl);

appCtrl.$inject = ['$scope', '$rootScope', '$state', 'Account'];

function appCtrl($scope, $rootScope, $state, Account) {

	var vm = this;

    vm.nav = false;

	$rootScope.$on('$stateChangeStart', function(event, toState){ 
	    vm.nav = false;
	})

	vm.logout = function() {
		Account.logout();
	}

	vm.hasAuth = function() {
	    return Account.hasAuth();
	}

}