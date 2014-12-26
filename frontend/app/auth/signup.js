angular
    .module('momentum')
    .directive('signupForm', signup);

function signup() {
   
  var directive = {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: '/partials/auth/signup.html',
        scope: {},
        controller : controller,
        controllerAs: 'vm'
  };
  
  return directive;

  controller.$inject = ['$scope', '$auth', '$alert'];
  
  function controller($scope, $auth, $alert) {
    
    var vm = this;

    vm.signup = function() {
      $auth.signup({
        displayName: vm.displayName,
        email: vm.email,
        password: vm.password
      }).catch(function(response) {
        $alert({
          content: JSON.stringify(response),
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 6
        });
      });
    };

  }

}
