angular.module('MyApp')
.filter('noHTML', function () {
    return function(text) {
        return text.replace(/<\/?[^>]+>/gi, '')
    }
});