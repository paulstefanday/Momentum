angular
    .module('MyApp')
    .directive('editCampaigns', editCampaigns);

function editCampaigns() {
   
    var directive = {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: '/partials/campaigns/edit.html',
        scope: {
          bsTooltip: '@',
        },
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
    }

    campCtrl.create = function() {
      Campaign.create(campCtrl.newcampaign)
        .success(function(data) {
          campCtrl.campaigns.push(data);
          campCtrl.newcampaign = {};
          // $scope.createForm.$setPristine();
          $alert({ content: "Campaign created successfully" });
        })
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
    }

    campCtrl.destory = function(id) {
      if(confirm("Are you sure you want to delete this campaign?")) Campaign.destory(id)
        .success(function(data) {
          var index = lodash.findIndex(campCtrl.campaigns, { 'id': id });
          campCtrl.campaigns.splice(index, 1); 
          $alert({ content: 'Campaign deleted successfully' });
        })
    }

  
  }

  function link(scope, element, attr, ctrl) {
    ctrl.newcampaign = {};
    ctrl.campaigns = {};
    ctrl.editing = false;
    ctrl.find();
  }

}
