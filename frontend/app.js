angular.module('momentum', ['ngAnimate', 'templates', 'ngResource', 'ngMessages', 'ui.router', 'mgcrea.ngStrap', 'satellizer', 'ngSanitize', 'ngLodash'])
  .config(['$stateProvider', '$urlRouterProvider', '$authProvider', '$httpProvider', '$datepickerProvider', '$alertProvider', '$selectProvider', '$tooltipProvider', function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $datepickerProvider, $alertProvider, $selectProvider, $tooltipProvider) {

    var noauth = [
      { state: 'home',          url: '/',             html: '<home-page/>',             directive: true },
      { state: 'login',         url: '/login',        html: '<login-form/>',            directive: true },
      { state: 'search',        url: '/search',       html: '<search/>',                directive: true },
      { state: 'signup',        url: '/signup',       html: '<signup-form/>',           directive: true }
    ];

    var hasauth = [
      { state: 'admin',         url: '/admin',              html: '<user-profile/>',        directive: true },
      { state: 'profile',       url: '/admin/profile',      html: '<user-profile/>',        directive: true },
      { state: 'campaigns',     url: '/admin/campaigns',    html: '<edit-campaigns/>',      directive: true },
      { state: 'actions',       url: '/admin/campaigns/:id/actions',    html: '<edit-actions/>',      directive: true }
    ];

    // alert settings
    angular.extend($alertProvider.defaults, {
      animation: '',
      type: 'material',
      duration: 5,
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

    angular.extend($tooltipProvider.defaults, {
      animation: 'am-flip-x',
      trigger: 'hover'
    });

    $urlRouterProvider.otherwise('/');

    // Satellizer settings
    $authProvider.loginOnSignup = true;
    $authProvider.loginRedirect = '/admin';
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

    // process routes
    noauth.forEach(function(route) {
      if(!route.directive) $stateProvider.state(route.state, { url: route.url, templateUrl: 'partials/' + route.html } );
      else $stateProvider.state(route.state, { url: route.url, template: route.html } );
    });

    // process auth routes
    hasauth.forEach(function(route) {
      if(!route.directive) var page = { url: route.url, templateUrl: 'partials/' + route.html };
      else var page = { url: route.url, template: route.html };
      page.resolve = { authenticated: ['$location', '$auth', function($location, $auth) { if (!$auth.isAuthenticated()) return $location.path('/login'); }] };
      $stateProvider.state(route.state, page);  
    });

  }]);




