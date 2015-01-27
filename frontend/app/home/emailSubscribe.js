
angular.module('momentum').directive('emailSubscribe', emailSubscribe);

function emailSubscribe() {
  return {
      restrict: 'E',
      scope: {
        bsTooltip: '@',
      },
      bindToController: true,
      controller : 'ContactCtrl as home',
      templateUrl: '/partials/home/emailSubscribe.html'
  };
};



