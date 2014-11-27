
angular.module('MyApp').directive('search', homeSearch);

function homeSearch() {
  return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {},
      controller : controller,
      controllerAs: 'vm',
      templateUrl: '/partials/home/search.html',
  };
  


  controller.$inject = ['$scope', 'Locations', '$alert', '$auth', '$window'];

  function controller($scope, Locations, $alert, $auth, $window) {

    var vm = this;

    vm.back = function() {
      $window.history.back();
    }

    // $scope.categories = [
    //   {"value":"","label":"Tech"},
    //   {"value":"","label":"Campaigning"},
    //   {"value":"","label":"Education"},
    //   {"value":"","label":"Marketing"},
    //   {"value":"","label":"Management"},
    // ];

    // $scope.locations = Locations.getStates();
          
  }

}



