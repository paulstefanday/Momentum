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
  

  controller.$inject = ['$scope', 'Account'];

  function controller($scope, Account) {
          
    var profileCtrl = this;

    // Get user's profile information.
    profileCtrl.find = function() {
      Account.find()
        .success(function(data) {
          profileCtrl.user = data;
        })
    };

    // Update user's profile information.
    profileCtrl.update = function() {
      Account.update(profileCtrl.user);
    };

    // // Link third-party provider.
    // profileCtrl.link = function(provider) {
    //   $auth.link(provider)
    //     .then(function() {
    //       $alert({ content: 'You have successfully linked ' + provider + ' account' });
    //     })
    //     .then(function() {
    //       profileCtrl.find();
    //     })
    //     .catch(function(response) {
    //       $alert({ content: JSON.stringify(response) });
    //     });
    // };

    // //Unlink third-party provider.
    // profileCtrl.unlink = function(provider) {
    //   $auth.unlink(provider)
    //     .then(function() {
    //       $alert({ content: 'You have successfully unlinked ' + provider + ' account' });
    //     })
    //     .then(function() {
    //       profileCtrl.find();
    //     })
    //     .catch(function(response) {
    //       $alert({ content: response.data ? JSON.stringify(response) : 'Could not unlink ' + provider + ' account' });
    //     });
    // };

  }

  function link(scope, el, attr, ctrl) {
    ctrl.find();
  }

};

