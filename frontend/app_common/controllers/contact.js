angular.module('momentum')
  .controller('ContactCtrl', ContactCtrl);

ContactCtrl.$inject = ['$scope', '$alert', '$auth', 'Email'];

function ContactCtrl($scope, $alert, $auth, Email) {
        
      var homeCtrl = this;

      homeCtrl.joinUp = function() {
          if(!homeCtrl.email) return $alert({ content: 'Email needs to be valid' });

          Email.subscribe({ email: homeCtrl.email }).then(function() {
            homeCtrl.email = '';
            $alert({ content: 'Thanks for subscribing' });
          })
      }
}