angular
    .module('MyApp')
    .directive('editPetitions', editPetitions);

function editPetitions() {
   
    var directive = {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: '/partials/campaigns/petitions/edit.html',
        scope: {},
        controller : controller,
        controllerAs: 'pertCtrl',
        link: link
    };
    return directive;


  controller.$inject = ['$scope', '$alert', 'Petition', 'lodash'];
  
  function controller( $scope, $alert, Petition, lodash ) {
    
    var pertCtrl = this;

    pertCtrl.find = function() {
      Petition.find()
        .success(function(data) {
          pertCtrl.petitions = data;
        })
        .error(function(error) {
          $alert({ content: JSON.stringify(error) });
        });
    }

    pertCtrl.create = function() {
      Petition.create(pertCtrl.newpetition)
        .success(function(data) {
          pertCtrl.petitions.push(data);
          pertCtrl.newpetition = {};
          // $scope.createForm.$setPristine();
          $alert({ content: "Petition created successfully" });
        })
        .error(function(error) {
          $alert({ content: error.message });
        });
    }

    pertCtrl.reset = function() {
      pertCtrl.newpetition = {};
      pertCtrl.editing = false;
    }

    pertCtrl.edit = function(petition) {
      pertCtrl.newpetition = petition;
      pertCtrl.editing = true;
    }

    pertCtrl.update = function(petition) {
      Petition.update(petition)
        .success(function(data) {
          pertCtrl.editing = false;
          pertCtrl.newpetition = {};
          // $scope.editForm.$setPristine();
          $alert({ content: 'Petition updated successfully' });
        })
        .error(function(error) {
          $alert({ content: error.message });
        });
    }

    pertCtrl.destory = function(id) {
      Petition.destory(id)
        .success(function(data) {
          var index = lodash.findIndex(pertCtrl.petitions, { 'id': id });
          pertCtrl.petitions.splice(index, 1); 
          $alert({ content: 'Petition deleted successfully' });
        })
        .error(function(error) {
          $alert({ content: error.message });
        });
    }

  
  }

  function link(scope, element, attr, ctrl) {
    ctrl.newpetition = {};
    ctrl.petitions = {};
    ctrl.editing = false;
    ctrl.find();
  }

}
