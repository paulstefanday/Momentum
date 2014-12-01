angular.module('MyApp')
  .controller('JobCreateCtrl', function($scope, $auth, $alert, Account, Job, Locations) {

	$scope.job = {};
	$scope.jobs = {};
  $scope.states = Locations.getStates();

    $scope.getJobs = function() {
		Job.getJobs().success(function(data) {
          $scope.jobs = data.data;
          console.log(data.data);
        })
        .error(function(error) {
          $alert({ content: error.message });
        });
    };

    $scope.addJob = function() {
     Job.addJob($scope.job)
        .success(function(data) {
          $scope.jobs.push(data.data);
          $scope.job = {};
          $scope.createForm.$setPristine();
          $alert({ content: "Job created successfully" });
        })
        .error(function(error) {
          $alert({ content: error.message });
        });
    };

    $scope.deleteJob = function(index, id) {
     	Job.deleteJob(id)
        .success(function(data) {
          console.log(data);
          $scope.jobs.splice(index, 1); 
        })
        .error(function(error) {
          $alert({ content: error.message });
        });
    };


    $scope.getJobs();

});