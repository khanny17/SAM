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
                    .state('signup', {
                        url: '/signup', //The url for the state
                        templateUrl: 'templates/create-user.html', //The path to the html template
                        controller: 'createUserController' //The path to the angular controller
                    })
                    .state('inside', {
                        abstract: true,
                        templateUrl: 'templates/inside.html',
                        controller: 'insideController'
                    })
                    .state('inside.home', {
                        url: '/', //The url for the state
                        templateUrl: 'templates/home.html', //The path to the html template
                        controller: 'homeController' //The path to the angular controller
                    })
                    .state('inside.notifications', {
                        url: '/notifications', //The url for the state
                        templateUrl: 'templates/notifications.html', //The path to the html template
                        controller: 'notificationsController' //The path to the angular controller
                    })
                    .state('inside.create-paper', {
                        url: '/submit-paper',
                        templateUrl: 'templates/submit-paper.html',
                        controller: 'submitPaperController'
                    })
                    .state('inside.update-paper', {
                        url: '/update-paper/:paperID',
                        templateUrl: 'templates/update-paper.html',
                        controller: 'updatePaperController'
                    })
                    .state('inside.update-user-role', {
                        url: '/update-user-role',
                        templateUrl: 'templates/update-user-role.html',
                        controller: 'updateUserRoleController',
                        data: {
                            permissions: ['Admin']
                        }
                    })
                    .state('inside.view-papers', {
                        url: '/view-papers',
                        templateUrl: 'templates/view-papers.html',
                        controller: 'viewPapersController'
                    })
                    .state('inside.view-paper-versions', {
                        url: '/view-paper-versions/:paperID',
                        templateUrl: 'templates/view-paper-versions.html',
                        controller: 'viewPaperVersionsController'
                    })
                    .state('inside.view-user', {
                        url: '/view-user', //The url for the state
                        templateUrl: 'templates/view-user.html', //The path to the html template
                        controller: 'viewUserController', //The path to the angular controller
                        data: {
                            permissions: ['Admin']
                        }
                    })
                    .state('inside.view-papers-pcm', {
                        url: '/view-papers-pcm',
                        templateUrl: 'templates/view-papers-pcm.html',
                        controller: 'viewPapersPCMController',
                        data: {
                            permissions: ['PCM']
                        }
                    })
                    .state('inside.rate-paper-pcm', {
                        url: '/rate-paper-pcm/:submissionId',
                        templateUrl: 'templates/rate-paper-pcm.html',
                        controller: 'ratePaperPCMController',
                           data: {
                         permissions: ['PCM']
                         }
                    })
                    .state('inside.set-paper-preference-pcm', {
                        url: '/set-paper-preference-pcm',
                        templateUrl: 'templates/set-paper-preference-pcm.html',
                        controller: 'setPaperPreferencePCMController',
                           data: {
                         permissions: ['PCM']
                         }
                    })
                    .state('inside.manage-deadlines', {
                        url: '/manage-deadlines',
                        templateUrl: 'templates/manage-deadlines.html',
                        controller: 'manageDeadlineController',
                           data: {
                         permissions: ['Admin']
                         }
                    })
                    .state('inside.set-review-template', {
                        url: '/set-review-template',
                        templateUrl: 'templates/set-template-review.html',
                        controller: 'setReviewTemplateController',
                           data: {
                         permissions: ['Admin']
                         }
                    })
                    .state('inside.view-papers-pcc', {
                      url: '/view-papers-pcc',
                      templateUrl: 'templates/view-papers-pcc.html',
                      controller: 'viewPapersPCCController',
                      data: {
                        permissions: ['PCC']
                      }
                    })
                    .state('inside.rate-paper-pcc', {
                      url: '/rate-paper-pcc/:submissionId',
                      templateUrl: 'templates/rate-paper-pcc.html',
                      controller: 'ratePaperPCCController',
                      data: {
                        permissions: ['PCC']
                      }
                    });
            }])

        .run(function ($rootScope, $state, AuthService) {
            $rootScope.$on('$stateChangeStart', function (event,next) {
                if (!AuthService.isAuthenticated()) {
                    console.log(next.name);
                    if (next.name !== 'login' && next.name !== 'signup') {
                        event.preventDefault();
                        $state.go('login');
                    }
                } else if(next.data && next.data.permissions){ //check if the state requires permissions
                    if(!next.data.permissions.includes(AuthService.authenticatedUser().Role)) { //If the user doesn't have perms
                        console.log("User does not have permission to access state: " + next.name);
                        event.preventDefault();
                        $state.go('inside.home');
                    }
                }
            });
        });
}());
