angular
    .module('momentum')
    .directive('formEdit', formEdit);

function formEdit() {
   
    var directive = {
        restrict: 'E',
        templateUrl: '/partials/form-edit.html',
        scope: {
            update: "&",
            reset: "@",
            title: "@",
            template: "@",
            item: "="
        },  
    };

    return directive;

}
