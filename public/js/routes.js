(function () {
    'use strict';

    angular.module('SAMRoutes', [])

        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function( $stateProvider,   $urlRouterProvider,   $locationProvider) {
                $urlRouterProvider.otherwise('/');
                $locationProvider.html5Mode(true);

                //Define States here
                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl: 'templates/login.html',
                        controller: 'loginController'
                    })
                    .state('home', {
                        url: '/', //The url for the state
                        templateUrl: 'templates/home.html', //The path to the html template
                        controller: 'homeController' //The path to the angular controller
                    })
                    .state('submit-paper', {
                        url: '/submit-paper',
                        templateUrl: 'templates/submit-paper.html',
                        controller: 'submitPaperController'
                    })
                    .state('view-papers', {
                        url: '/view-papers',
                        templateUrl: 'templates/view-papers.html',
                        controller: 'viewPapersController'
                    })
                    .state('signup', {
                        url: '/signup', //The url for the state
                        templateUrl: 'templates/create-user.html', //The path to the html template
                        controller: 'createUserController' //The path to the angular controller
                    })
                    .state('view-user', {
                        url: '/view-user', //The url for the state
                        templateUrl: 'templates/view-user.html', //The path to the html template
                        controller: 'viewUserController' //The path to the angular controller
                    });
            }])

        .run(function ($rootScope, $state, AuthService) {
            $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
                if (!AuthService.isAuthenticated()) {
                    console.log(next.name);
                    if (next.name !== 'login' && next.name !== 'signup') {
                        event.preventDefault();
                        $state.go('login');
                    }
                }
            });
        });
}());
