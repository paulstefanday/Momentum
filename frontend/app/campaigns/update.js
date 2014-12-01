angular.module('MyApp')
  .controller('JobUpdateCtrl', function($scope, $stateParams, $auth, $alert, Account, Job, $location, $http, Locations ) {

	 $scope.job = {};
   $scope.states = Locations.getStates();

    $scope.getJob = function() {
		Job.getJob($stateParams.id).success(function(data) {
          $scope.job = data.data;
        })
        .error(function(error) {
          $alert({ content: error.message });
        });
    };

    $scope.updateJob = function(index, id) {
     	Job.updateJob($scope.job)
        .success(function(data) {
          $location.path('/admin/jobs');
          $alert({ content: 'Job saved successfully' });
        })
        .error(function(error) {
          $alert({ content: error.message });
        });
    };

    $scope.getJob();

});