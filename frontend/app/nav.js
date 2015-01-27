angular
    .module('momentum')
    .directive('navBar', navBar);

function navBar() {
   
    return {
        restrict: 'E',
        templateUrl: '/partials/nav.html',
        scope: {
            nav: '=',
            logout: '&',
            hasAuth: '&'
        }
    };

}

