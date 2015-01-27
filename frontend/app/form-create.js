angular
    .module('momentum')
    .directive('formCreate', formCreate);

function formCreate() {
   
    return {
        restrict: 'E',
        templateUrl: '/partials/form-create.html',
        scope: {
            create: "&",
            template: "@",
            title: "@"
        }, link: link
    };

    function link(scope, element, attr) {
        scope.item = {};

        scope.add = function() {
            scope.createForm.$setPristine();
            scope.create({ item: scope.item });
            scope.item = {};
        }
    }

}
