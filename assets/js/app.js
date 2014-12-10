angular
    .module('MyApp')
    .directive('navBar', navBar);

function navBar() {
   
    var directive = {
        restrict: 'E',
        templateUrl: '/partials/nav.html',
        // scope: {},
        replace: true,
        controller : controller,
        controllerAs: 'navCtrl'
    };

    return directive;

	controller.$inject = ['$scope', '$auth', '$state', '$alert'];
	function controller($scope, $auth, $state, $alert) {

        var navCtrl = this;

        navCtrl.goTo = function(name) {
            navCtrl.nav = false;
            $state.go(name);
        }

        navCtrl.toggleNav = function() {
            navCtrl.nav = !navCtrl.nav;
        }
	    
        navCtrl.isAuthenticated = function() {
          return $auth.isAuthenticated();
        }

        navCtrl.logout = function() {
            $auth.logout()
            .then(function() {
                navCtrl.nav = false;
                $alert({ content: 'You have been logged out' });
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
        // require: '^navBar',
        controller : controller,
        controllerAs: 'loginCtrl',

        link: function(scope, element, attr, ctrls){
            // ctrl.login = navBarCtrl.login();
            console.log(ctrls);
        } 
    };
    return directive;


  controller.$inject = ['$scope', '$auth', '$alert'];
  
  function controller($scope, $auth, $alert) {
    
    var loginCtrl = this;

    loginCtrl.login = function() {
      $auth.login({ email: loginCtrl.email, password: loginCtrl.password })
        .then(function() {
          $alert({ content: 'You have successfully logged in' });
        })
        .catch(function(response) {
          $alert({ content: JSON.stringify(response) });
        });
    }

    loginCtrl.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $alert({ content: 'You have successfully logged in' });
        })
        .catch(function(response) {
          $alert({ content: JSON.stringify(response) });
        });
    }
  
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

angular
    .module('MyApp')
    .directive('editCampaigns', editCampaigns);

function editCampaigns() {
   
    var directive = {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: '/partials/campaigns/edit.html',
        scope: {},
        controller : controller,
        controllerAs: 'campCtrl',
        link: link
    };
    return directive;


  controller.$inject = ['$scope', '$alert', 'Campaign', 'lodash'];
  
  function controller( $scope, $alert, Campaign, lodash ) {
    
    var campCtrl = this;

    campCtrl.find = function() {
      Campaign.find()
        .success(function(data) {
          campCtrl.campaigns = data;
        })
        .error(function(error) {
          $alert({ content: JSON.stringify(error) });
        });
    }

    campCtrl.create = function() {
      Campaign.create(campCtrl.newcampaign)
        .success(function(data) {
          campCtrl.campaigns.push(data);
          campCtrl.newcampaign = {};
          // $scope.createForm.$setPristine();
          $alert({ content: "Job created successfully" });
        })
        .error(function(error) {
          $alert({ content: error.message });
        });
    }

    campCtrl.reset = function() {
      campCtrl.newcampaign = {};
      campCtrl.editing = false;
    }

    campCtrl.edit = function(campaign) {
      campCtrl.newcampaign = campaign;
      campCtrl.editing = true;
    }

    campCtrl.update = function(campaign) {
      Campaign.update(campaign)
        .success(function(data) {
          campCtrl.editing = false;
          campCtrl.newcampaign = {};
          // $scope.editForm.$setPristine();
          $alert({ content: 'Campaign updated successfully' });
        })
        .error(function(error) {
          $alert({ content: error.message });
        });
    }

    campCtrl.destory = function(id) {
      Campaign.destory(id)
        .success(function(data) {
          var index = lodash.findIndex(campCtrl.campaigns, { 'id': id });
          campCtrl.campaigns.splice(index, 1); 
          $alert({ content: 'Campaign deleted successfully' });
        })
        .error(function(error) {
          $alert({ content: error.message });
        });
    }

  
  }

  function link(scope, element, attr, ctrl) {
    ctrl.newcampaign = {};
    ctrl.campaigns = {};
    ctrl.editing = false;
    ctrl.find();
  }

}

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

