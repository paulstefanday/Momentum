
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

