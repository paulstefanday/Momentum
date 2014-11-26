angular
    .module('MyApp')
    .directive('previewJob', previewJob);

function previewJob() {
   
    var directive = {
        restrict: 'E',
        transclude: true,
        templateUrl: '/partials/job/preview.html',
        scope: {},
        link: link,
        controller : controller,
        controllerAs: 'vm'
    };
    return directive;


	controller.$inject = ['$scope', 'Job', '$alert'];
	
	function controller($scope, Job, $alert) {
		
		var vm = this;
		vm.jobs = {};

		vm.loadJobs = function() {
			Job.getFeed().success(function(data) {
			    vm.jobs = data.data;
			});
		}

		vm.favorite = function(job) {
			var data = { job_id: job.id };
			Job.addFav(data).success(function(data){
				$alert({ content: "Added to favorites" });
			}).error(function (error) {
				$alert({ content: 'Please login to select a favorite' });
			})
		}
	
	}

	function link(scope, el, attr, ctrl) {
	
		ctrl.loadJobs();
    
    }
}

