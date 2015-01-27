angular
  .module('momentum')
  .controller('campaignsCtrl', campaignsCtrl);

campaignsCtrl.$inject = ['$scope', '$alert', 'Campaign', '$state', 'campaignFeed'];
  
function campaignsCtrl( $scope, $alert, Campaign, $state, campaignFeed ) {
    
    var vm = this;
    
    vm.items = campaignFeed;

    vm.create = function(item) {
      Campaign.create(item)
        .success(function(data) {
          vm.items.push(data);
          $alert({ content: "Campaign created successfully" });
        })
    }

    vm.update = function(item) {
      Campaign.update(item)
        .success(function(data) {
          angular.forEach(vm.items, function(item, i) {
              if(item.id == data[0].id) vm.items[i] = data[0];
          });
          $state.go('^.create');
          $alert({ content: 'Campaign updated successfully' });
        })
    }

    // needs to remove item from digest using scope.apply or angular.forEach
    vm.destroy = function(id) {
      if(confirm("Are you sure you want to delete this campaign?")) Campaign.destroy(id)
        .success(function(data) {
          vm.items = vm.items.filter(function(item){ return item.id !== id; });
          $alert({ content: 'Campaign deleted successfully' });
        })
    }
  
  }