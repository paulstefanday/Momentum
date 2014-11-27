angular.module('MyApp', ['ngAnimate', 'templates', 'ngResource', 'ngMessages', 'ui.router', 'mgcrea.ngStrap', 'satellizer', 'ngSanitize',  'angular-loading-bar'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $datepickerProvider, $alertProvider, $selectProvider) {

    var noauth = [
      { state: 'home',            url: '/',             html: '<home-page></home-page>',            directive: true },
      { state: 'login',           url: '/login',        html: '<login-form></login-form>',          directive: true },
      { state: 'search',          url: '/search',       html: '<search></search>',                  directive: true },
      { state: 'signup',          url: '/signup',       html: '<signup-form></signup-form>',        directive: true }
    ];

    var hasauth = [
      // { state: 'admin',           url: '/admin',             ctrl: 'Admin',           html: 'partials/admin/user/profile.html' },
      // { state: 'profile',         url: '/admin/profile',     ctrl: 'Profile',         html: 'partials/admin/user/profile.html' },
      // { state: 'adminjobupdate',  url: '/admin/job/:id',     ctrl: 'JobUpdate',       html: 'partials/admin/job/update.html' },
      // { state: 'adminjob',        url: '/admin/jobs',        ctrl: 'JobCreate',       html: 'partials/admin/job/create.html' },
      // { state: 'adminjobfav',     url: '/admin/jobs/favorites', ctrl: 'JobFavorite',  html: 'partials/admin/job/favorites.html' },
      // { state: 'admincategory',   url: '/category',          ctrl: 'CategoryCreate',  html: 'partials/admin/category/addcategory.html' }
    ];

    // process routes
    noauth.forEach(function(route) {
      if(!route.directive) $stateProvider.state(route.state, { url: route.url, templateUrl: 'partials/' + route.html } );
      else $stateProvider.state(route.state, { url: route.url, template: route.html } );
    });

    // process auth routes
    hasauth.forEach(function(route) {
        $stateProvider.state(route.state, { url: route.url, controller: route.ctrl +'Ctrl', templateUrl: 'partials/' + route.html, resolve: {
          authenticated: ['$location', '$auth', function($location, $auth) { if (!$auth.isAuthenticated()) return $location.path('/login'); }]
        }
      });  
    });

    // alert settings
    angular.extend($alertProvider.defaults, {
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 5
    });

    // datepicker settings
    angular.extend($datepickerProvider.defaults, {
        dateFormat: 'yyyy-MM-dd',
        placement: "top-left",
        dateType: 'string',
        autoclose: 1
    });

    angular.extend($selectProvider.defaults, {
      animation: 'am-flip-x',
      placement: 'top',
      html: true,
      multiple: true
    });

    $urlRouterProvider.otherwise('/');

$authProvider.loginOnSignup = true;
$authProvider.loginRedirect = '/';
$authProvider.logoutRedirect = '/';
$authProvider.signupRedirect = '/login';
$authProvider.loginUrl = '/auth/login';
$authProvider.signupUrl = '/auth/signup';
$authProvider.loginRoute = '/login';
$authProvider.signupRoute = '/signup';
$authProvider.tokenName = 'token';
$authProvider.tokenPrefix = 'satellizer'; // Local Storage name prefix
// $authProvider.unlinkUrl = '/auth/unlink/';
// $authProvider.authHeader = 'Bearer';

    // Social media login providers
    $authProvider.facebook({
      clientId: '657854390977827'
    });

    $authProvider.linkedin({
      clientId: '77cw786yignpzj'
    });

    $authProvider.twitter({
      url: '/auth/twitter'
    });

  }).run(["$rootScope", "$location", 
    function ($rootScope, $location) {
        $rootScope.nav = false;

        $rootScope.hideNav = function() {
            $rootScope.nav = false;
        }
}] );




