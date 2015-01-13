angular
    .module('momentum')
    .directive('actionPreview', actionPreview);

function actionPreview() {
   
    var directive = {
        restrict: 'E',
        templateUrl: '/partials/campaigns/actions/preview.html',
        require: "^editActions",
        scope: {
          bsTooltip: '@',
          action: '='
        },
        link: link
    };
    return directive;

  function link(scope, element, attr, ctrl) {
    
    scope.showScript = false;

    scope.toggleScript = function() {
        scope.showScript = !scope.showScript;
    }

    scope.edit = function(action){
        ctrl.edit(action);
    }

    scope.destroy = function(id){
        ctrl.destroy(id);
    }

    scope.getScript = function(action) {
        var title = action.title.toString().toLowerCase()
          .replace(/\s+/g, '-')         // Replace spaces with -
          .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
          .replace(/\-\-+/g, '-')       // Replace multiple - with single -
          .replace(/^-+/, '')           // Trim - from start of text
          .replace(/-+$/, '')           // Trim - from end of text
          .substring(0,10);          
        return 'git clone https://github.com/MomentumBuild/angular-actions-example '+title+'; cd '+title+'; sudo npm install; bower update; gulp --server live --camp '+action.campaign+' --action '+ action.id;
    }

  }

}
