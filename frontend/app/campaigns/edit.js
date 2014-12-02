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


  controller.$inject = ['$scope', '$alert', 'Campaign'];
  
  function controller( $scope, $alert, Campaign ) {
    
    var campCtrl = this;

    campCtrl.getCampaigns = function() {
      Campaign.find()
        .success(function(data) {
          campCtrl.campaigns = data;
        })
        .error(function(error) {
          $alert({ content: JSON.stringify(error) });
        });
    }

    campCtrl.addCampaign = function() {
      Campaign.create(campCtrl.newcampaign)
        .success(function(data) {
          console.log(data)
          campCtrl.campaigns.push(data.campaigns[0]);
          campCtrl.newcampaign = {};
          campCtrl.createForm.$setPristine();
          $alert({ content: "Job created successfully" });
        })
        .error(function(error) {
          $alert({ content: error.message });
        });
    }

    // campCtrl.deleteJob = function(index, id) {
    //   Campaign.delete(id)
    //     .success(function(data) {
    //       console.log(data);
    //       $scope.jobs.splice(index, 1); 
    //     })
    //     .error(function(error) {
    //       $alert({ content: error.message });
    //     });
    // }

  
  }

  function link(scope, element, attr, ctrl) {
    ctrl.newcampaign = {};
    ctrl.campaigns = {};
    ctrl.getCampaigns();
  }

}
