angular
    .module('momentum')
    .directive('campaignPreview', campaignPreview);

function campaignPreview() {
   
    var directive = {
        restrict: 'E',
        templateUrl: '/partials/campaigns/preview.html',
        require: "^editCampaigns",
        scope: {
          bsTooltip: '@',
          campaign: '='
        },
        link: link
    };
    return directive;

  function link(scope, element, attr, ctrl) {
    
    scope.showScript = false;

    scope.toggleScript = function() {
        scope.showScript = !scope.showScript;
    }

    scope.edit = function(campaign){
        ctrl.edit(campaign);
    }

    scope.destroy = function(id){
        ctrl.destroy(id);
    }

  }

}
