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
          $alert({ content: JSON.stringify(response) });
        });
    };

    vm.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $alert({ content: 'You have successfully logged in' });
        })
        .catch(function(response) {
          $alert({ content: JSON.stringify(response) });
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
        $alert({
          content: JSON.stringify(response),
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 6
        });
      });
    };

  }

}

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
            // if(!auth) return $alert({ content: 'Email needs to be valid' });

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





angular.module('MyApp').directive('userProfile', userProfile);

function userProfile() {
  return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {},
      controller : controller,
      link: link,
      controllerAs: 'vm',
      templateUrl: '/partials/user/profile.html'
  };
  


  controller.$inject = ['$scope', '$alert', '$auth', 'Account'];

  function controller($scope, $alert, $auth, Account) {
          
        var vm = this;

    /**
     * Get user's profile information.
     */
    vm.getProfile = function() {
      Account.getProfile()
        .success(function(data) {
          vm.user = data;
        })
        .error(function(error) {
          $alert({ content: JSON.stringify(error) });
        });
    };


    /**
     * Update user's profile information.
     */
    vm.updateProfile = function() {
      Account.updateProfile({
        displayName: vm.user.displayName,
        email: vm.user.email
      }).then(function() {
        $alert({ content: 'Profile has been updated' });
      }).catch(function(response) {
        $alert({ content: 'Update failed' });
      });
    };

    /**
     * Link third-party provider.
     */
    vm.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          $alert({ content: 'You have successfully linked ' + provider + ' account' });
        })
        .then(function() {
          vm.getProfile();
        })
        .catch(function(response) {
          $alert({ content: JSON.stringify(response) });
        });
    };

    /**
     * Unlink third-party provider.
     */
   vm.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $alert({ content: 'You have successfully unlinked ' + provider + ' account' });
        })
        .then(function() {
          vm.getProfile();
        })
        .catch(function(response) {
          $alert({ content: response.data ? JSON.stringify(response) : 'Could not unlink ' + provider + ' account' });
        });
    };

  }

    function link(scope, el, attr, ctrl) {

          ctrl.getProfile();

    }

};

