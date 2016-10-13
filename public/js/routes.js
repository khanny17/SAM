(function () {
    'use strict';

    angular.module('SAMRoutes', [])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function( $stateProvider,   $urlRouterProvider,   $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

        //Define States here
        $stateProvider
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
            .state('create-user', {
                url: '/create-user', //The url for the state
                templateUrl: 'templates/create-user.html', //The path to the html template
                controller: 'createUserController' //The path to the angular controller
            });
    }]);
}());
