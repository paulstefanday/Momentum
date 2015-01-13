angular
  .module('momentum')
  .controller('actionsCtrl', actionsCtrl);

actionsCtrl.$inject = ['$scope', '$alert', 'Action', 'lodash'];
  
function actionsCtrl( $scope, $alert, Action, lodash ) {
    
    var vm = this;

    vm.find = function() {
      Action.find()
        .success(function(data) {
          console.log("actions", data);
          vm.actions = data;
        })
    }

    vm.create = function() {
      Action.create(vm.newaction)
        .success(function(data) {
          console.log(data);
          vm.actions.push(data);
          vm.newaction = {};
          // $scope.createForm.$setPristine();
          $alert({ content: "Action created successfully" });
        });
    }

    vm.update = function(action) {
      Action.update(action)
        .success(function(data) {
          vm.editing = false;
          vm.newaction = {};
          $alert({ content: 'Action updated successfully' });
        });
    }

    vm.destroy = function(id) {
      if(confirm("Are you sure you want to delete this action?")) Action.destroy(id)
        .success(function(data) {
          var index = lodash.findIndex(vm.actions, { 'id': id });
          vm.actions.splice(index, 1); 
          $alert({ content: 'Action deleted successfully' });
        });
    }

    vm.reset = function() {
      vm.newaction = {};
      vm.editing = false;
    }

    vm.edit = function(action) {
      vm.newaction = action;
      vm.editing = true;
    }

    vm.count = function(count) {
      return count ? count : 0;
    }
  
}

