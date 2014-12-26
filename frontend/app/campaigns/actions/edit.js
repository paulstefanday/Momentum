angular
    .module('momentum')
    .directive('editActions', editActions);

function editActions() {
   
    var directive = {
      restrict: 'E',
      bindToController: true,
      controller : 'actionsCtrl as ac',
      replace: true,
      templateUrl: '/partials/campaigns/actions/edit.html',
      scope: {
        bsTooltip: '@',
      },
      link: link
    };
    return directive;

  function link(scope, element, attr, ctrl) {
    ctrl.newaction = {};
    ctrl.actions = {};
    ctrl.editing = false;
    ctrl.find();
  }

}