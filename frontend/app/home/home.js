
angular.module('momentum').directive('homePage', homePage);

function homePage() {
  return {
      restrict: 'E',
      replace: true,
      scope: {
        bsTooltip: '@',
      },
      controller : controller,
      controllerAs: 'homeCtrl',
      templateUrl: '/partials/home/home.html'
  };

  controller.$inject = ['$scope', '$alert', '$auth', 'Email'];

  function controller($scope, $alert, $auth, Email) {
          
        var homeCtrl = this;

        homeCtrl.joinUp = function() {
            if(!homeCtrl.email) return $alert({ content: 'Email needs to be valid' });

            Email.subscribe({ email: homeCtrl.email }).then(function() {
              homeCtrl.email = '';
              $alert({ content: 'Thanks for subscribing' });
            })
        }
  }

};



