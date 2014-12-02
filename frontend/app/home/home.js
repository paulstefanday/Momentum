
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

  controller.$inject = ['$scope', '$alert', '$auth', 'Email'];

  function controller($scope, $alert, $auth, Email) {
          
        var vm = this;

        vm.joinUp = function() {
            if(!vm.email) return $alert({ content: 'Email needs to be valid' });

            Email.subscribe({ email: vm.email }).then(function() {
              $alert({ content: 'Thanks for subscribing' });
            })
            .catch(function(response) {
              $alert({ content: JSON.stringify(response) });
            });
        }
  }

  function link(scope, el, attr, ctrl) {

  }

};



