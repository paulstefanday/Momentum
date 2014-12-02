angular
    .module('MyApp')
    .directive('loginForm', login);

function login() {
   
    var directive = {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: '/partials/auth/login.html',
        scope: {},
        controller : controller,
        controllerAs: 'vm',
        // require: '^navBar',
        // link: function(scope, element, attr, navBarCtrl){
        //     scope.navBarCtrl = navBarCtrl;
        // } 
    };
    return directive;


  controller.$inject = ['$scope', '$auth', '$alert'];
  
  function controller($scope, $auth, $alert) {
    
    var vm = this;

    vm.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $alert({ content: 'You have successfully logged in' });
        })
        .catch(function(response) {
          $alert({ content: JSON.stringify(response) });
        });
    };
  
  }




}


