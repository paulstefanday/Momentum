angular
    .module('momentum')
    .directive('loginForm', login);

function login() {
   
    var directive = {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: '/partials/auth/login.html',
        scope: {},
        // require: '^navBar',
        controller : controller,
        controllerAs: 'loginCtrl',

        link: function(scope, element, attr, ctrls){
            // ctrl.login = navBarCtrl.login();
            console.log(ctrls);
        } 
    };
    return directive;


  controller.$inject = ['$scope', '$auth', '$alert'];
  
  function controller($scope, $auth, $alert) {
    
    var loginCtrl = this;

    loginCtrl.login = function() {
      $auth.login({ email: loginCtrl.email, password: loginCtrl.password })
        .then(function() {
          $alert({ content: 'You have successfully logged in' });
        })
        .catch(function(response) {
          $alert({ content: JSON.stringify(response) });
        });
    }

    loginCtrl.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $alert({ content: 'You have successfully logged in' });
        })
        .catch(function(response) {
          $alert({ content: JSON.stringify(response) });
        });
    }
  
  }




}


