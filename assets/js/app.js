angular
    .module('MyApp')
    .directive('navBar', navBar);

function navBar() {
   
    var directive = {
        restrict: 'E',
        templateUrl: '/partials/nav.html',
        scope: false,
        replace: true,
        controller : controller,
        // controllerAs: 'vm'
    };

    return directive;

	controller.$inject = ['$scope', '$auth', '$state', '$alert'];
	function controller($scope, $auth, $state, $alert) {

        // var vm = this;

        $scope.goTo = function(name) {
            $scope.nav = false;
            $state.go(name);
        }

        $scope.toggleNav = function() {
            $scope.nav = !$scope.nav;
        }
	    
        $scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
        };

        $scope.logout = function() {
            $auth.logout()
            .then(function() {
                $scope.nav = false;
                $alert({
                  content: 'You have been logged out',
                  animation: 'fadeZoomFadeDown',
                  type: 'material',
                  duration: 3
                });
            });
        }

    }

}


angular
    .module('MyApp')
    .directive('loginForm', login);

function login() {
   
    var directive = {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: '/partials/auth/login.html',
        scope: {},
        controller : controller,
        controllerAs: 'vm'
    };
    return directive;


  controller.$inject = ['$scope', '$auth', '$alert'];
  
  function controller($scope, $auth, $alert) {
    
    var vm = this;

    vm.login = function() {
      $auth.login({ email: vm.email, password: vm.password })
        .then(function() {
          $alert({ content: 'You have successfully logged in' });
        })
        .catch(function(response) {
          $alert({ content: response.data.message });
        });
    };

    vm.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $alert({ content: 'You have successfully logged in' });
        })
        .catch(function(response) {
          $alert({ content: response.data });
        });
    };
  
  }

}



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

angular.module('MyApp')
  .controller('CategoryCreateCtrl', function($scope, $auth, $alert, Account) {


});

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

