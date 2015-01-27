angular
  .module('momentum')
  .controller('actionsCtrl', actionsCtrl);

actionsCtrl.$inject = ['$scope', '$alert', 'Action', '$state', 'actionFeed'];
  
function actionsCtrl( $scope, $alert, Action, $state, actionFeed ) {
    
    var vm = this;
    vm.items = actionFeed;

    vm.create = function(item) {
      Action.create(item)
        .success(function(data) {
          vm.items.push(data);
          $alert({ content: "Action created successfully" });
        })
    }

    vm.update = function(item) {
      Action.update(item)
        .success(function(data) {
          angular.forEach(vm.items, function(item, i) {
              if(item.id == data[0].id) vm.items[i] = data[0];
          });
          $state.go('^.create');
          $alert({ content: 'Action updated successfully' });
        })
    }

    vm.destroy = function(id) {
      if(confirm("Are you sure you want to delete this action?")) Action.destroy(id)
        .success(function(data) {
          vm.items = vm.items.filter(function(item){ return item.id !== id; });
          $alert({ content: 'Action deleted successfully' });
        })
    }
  
  }