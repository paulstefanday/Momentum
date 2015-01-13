angular
    .module('momentum')
    .directive('editCampaigns', editCampaigns);

function editCampaigns() {
   
    var directive = {
        restrict: 'E',
        bindToController: true,
        controller : 'campaignsCtrl as cc',
        replace: true,
        templateUrl: '/partials/campaigns/edit.html',
        scope: {},
        link: link
    };
    return directive;

  function link(scope, element, attr, ctrl) {
    ctrl.newcampaign = {};
    ctrl.campaigns = {};
    ctrl.editing = false;
    ctrl.showScript = false;
    ctrl.find();
  }

}
