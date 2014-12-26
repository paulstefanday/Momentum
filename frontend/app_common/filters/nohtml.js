angular.module('momentum')
.filter('noHTML', function () {
    return function(text) {
        return text.replace(/<\/?[^>]+>/gi, '')
    }
});