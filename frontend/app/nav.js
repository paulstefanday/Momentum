angular
    .module('momentum')
    .directive('navBar', navBar);

function navBar() {
   
    var directive = {
        restrict: 'E',
        templateUrl: '/partials/nav.html',
        // scope: {},
        replace: true,
        controller : controller,
        controllerAs: 'navCtrl'
    };

    return directive;

	controller.$inject = ['$scope', '$auth', '$state', '$alert'];
	function controller($scope, $auth, $state, $alert) {

        var navCtrl = this;

        navCtrl.goTo = function(name) {
            navCtrl.nav = false;
            $state.go(name);
        }

        navCtrl.toggleNav = function() {
            navCtrl.nav = !navCtrl.nav;
        }
	    
        navCtrl.isAuthenticated = function() {
          return $auth.isAuthenticated();
        }

        navCtrl.logout = function() {
            $auth.logout()
            .then(function() {
                navCtrl.nav = false;
                $alert({ content: 'You have been logged out' });
            });
        }

    }

}

