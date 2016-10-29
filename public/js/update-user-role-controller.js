(function () {
    'use strict';

    angular.module('UpdateUserRoleControllerModule', ['AuthModule'])

        .controller('updateUserRoleController', ['$scope', '$http', 'AuthService', '$state', function ($scope, $http, AuthService, $state) {

            $scope.pccUsers = [];
            $scope.allUsers = [];
            $scope.pcmUsers = [];


            $scope.title = "SAM 2017 - Update User Role";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName + " " + AuthService.authenticatedUser().LastName;
            $scope.userID = AuthService.authenticatedUser().ID;


            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/user/get-users', $scope.users)
                .then(function (response) {
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.allUsers.push(response.data[i]);
                        switch (response.data[i].Role) {
                            case 'PCC':
                                $scope.pccUsers.push(response.data[i]);
                                $scope.allUsers.splice($scope.allUsers.indexOf(response.data[i]), 1);
                                break;
                            case 'PCM':
                                $scope.pcmUsers.push(response.data[i]);
                                $scope.allUsers.splice($scope.allUsers.indexOf(response.data[i]), 1);
                                break;
                        }
                    }
                    document.getElementById("overlayScreen").style.width = "0%";
                    document.getElementById("overlayScreen").style.height = "0%";

                });


            $scope.updateRoles = function () {
                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";

                var newPCC = [], newPCM = [];

                jQuery("#selectPCC option").each(function (i) {
                    newPCC[i] = jQuery(this).val();
                });

                jQuery("#selectPCM option").each(function (i) {
                    newPCM[i] = jQuery(this).val();
                });

                $http.post('services/user/update-roles', {params: { newPCC: newPCC, newPCM:  newPCM }})
                    .then(function () {

                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                        $state.go('inside.home');
                    });
            };


        }]);

}());
