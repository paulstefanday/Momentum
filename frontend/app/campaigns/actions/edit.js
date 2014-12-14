angular
    .module('MyApp')
    .directive('editActions', editActions);

function editActions() {
   
    var directive = {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: '/partials/campaigns/actions/edit.html',
        scope: {},
        controller : controller,
        controllerAs: 'actCtrl',
        link: link
    };
    return directive;


  controller.$inject = ['$scope', '$alert', 'Action', 'lodash'];
  
  function controller( $scope, $alert, Action, lodash ) {
    
    var actCtrl = this;

    actCtrl.find = function() {
      Action.find()
        .success(function(data) {
          actCtrl.actions = data;
        });
    }

    actCtrl.create = function() {
      Action.create(actCtrl.newaction)
        .success(function(data) {
          actCtrl.actions.push(data);
          actCtrl.newaction = {};
          // $scope.createForm.$setPristine();
          $alert({ content: "Action created successfully" });
        });
    }

    actCtrl.update = function(action) {
      Action.update(action)
        .success(function(data) {
          actCtrl.editing = false;
          actCtrl.newaction = {};
          // $scope.editForm.$setPristine();
          $alert({ content: 'Action updated successfully' });
        });
    }

    actCtrl.destory = function(id) {
      Action.destory(id)
        .success(function(data) {
          var index = lodash.findIndex(actCtrl.actions, { 'id': id });
          actCtrl.actions.splice(index, 1); 
          $alert({ content: 'Action deleted successfully' });
        });
    }

    actCtrl.reset = function() {
      actCtrl.newaction = {};
      actCtrl.editing = false;
    }

    actCtrl.edit = function(action) {
      actCtrl.newaction = action;
      actCtrl.editing = true;
    }

  
  }

  function link(scope, element, attr, ctrl) {
    ctrl.newaction = {};
    ctrl.actions = {};
    ctrl.editing = false;
    ctrl.find();
  }

}
