angular
    .module('MyApp')
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
        var errors = '';
        if(response.data.error.email) errors += response.data.error.email[0] + " ";
        if(response.data.error.displayName) errors +=  response.data.error.displayName[0]+ " ";
        if(response.data.error.password) errors += response.data.error.password[0]+ " ";
        $alert({
          content: errors,
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 6
        });
      });
    };

  }

}
