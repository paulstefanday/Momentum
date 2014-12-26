angular.module('momentum').directive('userProfile', userProfile);

function userProfile() {
  
  return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {},
      controller : controller,
      link: link,
      controllerAs: 'profileCtrl',
      templateUrl: '/partials/user/profile.html'
  };
  

  controller.$inject = ['$scope', '$alert', '$auth', 'Account'];

  function controller($scope, $alert, $auth, Account) {
          
    var profileCtrl = this;

    // Get user's profile information.
    profileCtrl.find = function() {
      Account.find()
        .success(function(data) {
          profileCtrl.user = data;
        })
        .error(function(error) {
          $alert({ content: JSON.stringify(error) });
        });
    };

    // Update user's profile information.
    profileCtrl.update = function() {
      console.log(profileCtrl.user)
      Account.update(profileCtrl.user).then(function() {
        $alert({ content: 'Profile has been updated' });
      }).catch(function(response) {
        $alert({ content: 'Update failed' });
      });
    };

    // Link third-party provider.
    profileCtrl.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          $alert({ content: 'You have successfully linked ' + provider + ' account' });
        })
        .then(function() {
          profileCtrl.find();
        })
        .catch(function(response) {
          $alert({ content: JSON.stringify(response) });
        });
    };

    //Unlink third-party provider.
    profileCtrl.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $alert({ content: 'You have successfully unlinked ' + provider + ' account' });
        })
        .then(function() {
          profileCtrl.find();
        })
        .catch(function(response) {
          $alert({ content: response.data ? JSON.stringify(response) : 'Could not unlink ' + provider + ' account' });
        });
    };

  }

  function link(scope, el, attr, ctrl) {
    ctrl.find();
  }

};

