angular
  .module('momentum')
  .controller('campaignCtrl', campaignCtrl);

campaignCtrl.$inject = ['$scope', '$alert', 'Campaign', 'lodash'];
  
function campaignCtrl( $scope, $alert, Campaign, lodash ) {
    
    var vm = this;

    vm.find = function() {
      Campaign.find()
        .success(function(data) {
          vm.campaigns = data;
        })
    }

    vm.create = function() {
      Campaign.create(vm.newcampaign)
        .success(function(data) {
          vm.campaigns.push(data);
          vm.newcampaign = {};
          // $scope.createForm.$setPristine();
          $alert({ content: "Campaign created successfully" });
        })
    }

    vm.reset = function() {
      vm.newcampaign = {};
      vm.editing = false;
    }

    vm.edit = function(campaign) {
      vm.newcampaign = campaign;
      vm.editing = true;
    }

    vm.update = function(campaign) {
      Campaign.update(campaign)
        .success(function(data) {
          vm.editing = false;
          vm.newcampaign = {};
          // $scope.editForm.$setPristine();
          $alert({ content: 'Campaign updated successfully' });
        })
    }

    vm.destory = function(id) {
      if(confirm("Are you sure you want to delete this campaign?")) Campaign.destory(id)
        .success(function(data) {
          var index = lodash.findIndex(vm.campaigns, { 'id': id });
          vm.campaigns.splice(index, 1); 
          $alert({ content: 'Campaign deleted successfully' });
        })
    }

  
  }