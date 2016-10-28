(function () {
    'use strict';

    angular.module('UpdateUserRoleControllerModule',  ['AuthModule'])

        .controller('updateUserRoleController', ['$scope', '$http','AuthService','$state', function($scope, $http, AuthService,$state) {

            $scope.pccUsers=[];
            $scope.pcc_AllUsers=[];
            $scope.pcmUsers=[];
            $scope.pcm_AllUsers=[];

            $scope.title = "SAM 2017 - Update User Role";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName +" " + AuthService.authenticatedUser().LastName;
            $scope.userID =  AuthService.authenticatedUser().ID;


            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/user/get-users', $scope.users)
                .then(function(response){
                    for(var i=0;i<response.data.length;i++){
                        $scope.pcc_AllUsers.push(response.data[i]);
                        $scope.pcm_AllUsers.push(response.data[i]);
                        switch (response.data[i].Role){
                            case 'PCC':
                                $scope.pccUsers.push(response.data[i]);
                                $scope.pcc_AllUsers.splice($scope.pcc_AllUsers.indexOf(response.data[i]),1);
                                break;
                            case 'PCM':
                                $scope.pcmUsers.push(response.data[i]);
                                $scope.pcm_AllUsers.splice($scope.pcm_AllUsers.indexOf(response.data[i]),1);
                                break;
                        }
                    }
                    document.getElementById("overlayScreen").style.width = "0%";
                    document.getElementById("overlayScreen").style.height = "0%";

                });

/*
            $scope.updateRole = function() {
                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";

                $http.post('services/paper/update-paper', $scope.paper)
                    .then(function(){

                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                        $state.go('inside.home');
                    });
            };
*/

        }]);

}());
