angular
    .module('MyApp')
    .directive('navBar', navBar);

function navBar() {
   
    var directive = {
        restrict: 'E',
        templateUrl: 'partials/nav.html',
        scope: false,
        replace: true,
        controller : controller,
        // controllerAs: 'vm'
    };

    return directive;

	controller.$inject = ['$scope', '$auth', '$state', '$alert'];
	function controller($scope, $auth, $state, $alert) {

        // var vm = this;

        $scope.goTo = function(name) {
            $scope.nav = false;
            $state.go(name);
        }

        $scope.toggleNav = function() {
            $scope.nav = !$scope.nav;
        }
	    
        $scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
        };

        $scope.logout = function() {
            $auth.logout()
            .then(function() {
                $scope.nav = false;
                $alert({
                  content: 'You have been logged out',
                  animation: 'fadeZoomFadeDown',
                  type: 'material',
                  duration: 3
                });
            });
        }

    }

}

