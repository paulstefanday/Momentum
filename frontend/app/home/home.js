
angular.module('MyApp').directive('homePage', homePage);

function homePage() {
  return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {},
      controller : controller,
      link: link,
      controllerAs: 'vm',
      templateUrl: '/partials/home/home.html'
  };
  


  controller.$inject = ['$scope', '$alert', '$auth'];

  function controller($scope, $alert, $auth) {
          
        var vm = this;

        vm.joinUp = function() {
            console.log(vm.email);
        }

  }

    function link(scope, el, attr, ctrl) {

    }

};



