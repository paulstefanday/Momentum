angular
    .module('momentum')
    .directive('previewCampaign', previewCampaign);

function previewCampaign() {
   
    var directive = {
        restrict: 'E',
        templateUrl: '/partials/campaigns/preview.html',
        scope: {
          bsTooltip: '@',
          item: '=',
          edit: '&',
          destroy: '&'
        },
        link: link
    };
    return directive;

  function link(scope, element, attr) {
    
    scope.showScript = false;

    scope.toggleScript = function() {
        scope.showScript = !scope.showScript;
    }

    scope.getScript = function() {
        var title = scope.item.title.toString().toLowerCase()
          .replace(/\s+/g, '-')         // Replace spaces with -
          .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
          .replace(/\-\-+/g, '-')       // Replace multiple - with single -
          .replace(/^-+/, '')           // Trim - from start of text
          .replace(/-+$/, '')           // Trim - from end of text
          .substring(0,10);          
        return 'git clone https://github.com/MomentumBuild/angular-actions-example '+title+'; cd '+title+'; sudo npm install; bower update; gulp --server live --camp --action '+ scope.item.id;
    }

  }

}
