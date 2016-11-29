(function () {
    'use strict';

    angular.module('NotificationsControllerModule', ['AuthModule'])

        .controller('notificationsController', ['$scope', '$state', '$http', 'AuthService',  function($scope, $state, $http, AuthService) {

            var user = AuthService.authenticatedUser();

            // --- Get notifications out of db and decide if we have new ones
            $http.get('services/notification/get-notifications', {params: { userID:  user.ID }})
            .then(function(response) {
                $scope.notifications = response.data;
            });


            $scope.createTestNotification = function() {
                $http.post('services/notification/create-notification', 
                { 
                        Text: 'This is a test',
                        userIds: [ user.ID ]
                })
                .then(function(response) {
                    console.log(response);
                });
            };

        }]);
}());
