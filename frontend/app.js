angular.module('momentum', ['ngAnimate', 'templates', 'ngResource', 'ngMessages', 'ui.router', 'mgcrea.ngStrap', 'satellizer', 'ngSanitize', 'ngLodash'])
  .config(['$stateProvider', '$urlRouterProvider', '$authProvider', '$httpProvider', '$datepickerProvider', '$alertProvider', '$selectProvider', '$tooltipProvider', function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $datepickerProvider, $alertProvider, $selectProvider, $tooltipProvider) {

    $stateProvider
      .state('app',         { abstract: true, controller: 'appCtrl as app', templateUrl: '/partials/index.html' })
      .state('app.home',    { url: '/home',     templateUrl: '/partials/home/home.html' })
      .state('app.about',   { url: '/about',    templateUrl: '/partials/about.html' })
      .state('app.login',   { url: '/login',    template: '<login-form/>' })
      .state('app.signup',  { url: '/signup',   template: '<signup-form/>' });



    // Admin directive
    $stateProvider
      .state('app.admin', { 
        abstract: true,
        template: '<ui-view class="core-view" />',
        url: '/admin',
        resolve: {
          authenticated: function($q, $location, $auth, $alert) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
              $alert({ content: 'You need to login to access this page' });
            } else deferred.resolve();

            return deferred.promise;
          },
          campaignFeed: function(Campaign) {
            return Campaign.find().then(function(data){ return data.data; })
          }
        }
      })


      // Campaign States
      .state('app.admin.campaigns', {
        abstract: true,
        url: '/campaigns',
        templateUrl: '/partials/campaigns/_campaign.html',
        controller: 'campaignsCtrl as camp'
      })
      .state('app.admin.campaigns.create', {
        url: '/create',
        views: {
          'sidebar': { templateUrl: '/partials/campaigns/create.html' }
        }
      })
      .state('app.admin.campaigns.edit', {
        url: '/edit/:id',
        resolve: {
          campaignItem: function(campaignFeed, $stateParams){
            return JSON.parse(JSON.stringify(campaignFeed.filter(function(item){ return item.id == $stateParams.id; })[0]));
          }
        },
        views: {
          'sidebar': { 
            controller: function($scope, campaignItem) { 
              $scope.item = campaignItem; 
            },
            templateUrl: '/partials/campaigns/edit.html' 
          }
        }
      })


      // Action States
      .state('app.admin.actions', {
        abstract: true,
        url: '/actions/:campaign',
        templateUrl: '/partials/campaigns/actions/_action.html',
        resolve: {
          actionFeed: function(Action, $stateParams) {
            return Action.find($stateParams.campaign).then(function(data){ console.log(data); return data.data; })
          }
        },
        controller: 'actionsCtrl as act'
      })
      .state('app.admin.actions.create', {
        url: '/create',
        views: {
          'sidebar': { templateUrl: '/partials/campaigns/actions/create.html' }
        }
      })
      .state('app.admin.actions.edit', {
        url: '/edit/:action',
        resolve: {
          actionItem: function(actionFeed, $stateParams){
            return JSON.parse(JSON.stringify(actionFeed.filter(function(item){ return item.id == $stateParams.action; })[0]));
          }
        },
        views: {
          'sidebar': { 
            controller: function($scope, actionItem) { $scope.item = actionItem; },
            templateUrl: '/partials/campaigns/actions/edit.html' 
          }
        }
      })

      .state('app.admin.profile', { url: '/profile', template: '<user-profile/>' });

    $urlRouterProvider.otherwise('/home');

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

    // Satellizer settings
    $authProvider.loginOnSignup = true;
    $authProvider.loginRedirect = '/admin/campaigns/create';
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

  }])




