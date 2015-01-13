
angular.module('momentum').directive('homePage', homePage);

function homePage() {
  return {
      restrict: 'E',
      scope: {
        bsTooltip: '@',
      },
      bindToController: true,
      controller : 'ContactCtrl as homeCtrl',
      templateUrl: '/partials/home/home.html'
  };
};



