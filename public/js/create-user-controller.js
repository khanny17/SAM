(function () {
    'use strict';

    angular.module('CreateUserControllerModule', [])

        .controller('createUserController', ['$scope', 'AuthService', '$state',
            function ($scope, AuthService, $state) {

                $scope.title = "SAM 2017 - User Registration";
                $scope.validation = [];

                $scope.createUser = function () {
                    if (isFormValid()) {
                        document.getElementById("overlayScreen").style.width = "100%";
                        document.getElementById("overlayScreen").style.height = "100%";

                        $scope.status = "Creating User....";
                        AuthService.register({
                            email: $scope.email,
                            password: $scope.password,
                            firstName: $scope.firstName,
                            lastName: $scope.lastName
                        }).then(function (response) {
                              //  $scope.users.push(response.data);
                                $scope.status ='User Created!';

                                document.getElementById("overlayScreen").style.width = "0%";
                                document.getElementById("overlayScreen").style.height = "0%";

                                $state.go('inside.home');
                            },
                            function (error) {
                                document.getElementById("overlayScreen").style.width = "0%";
                                document.getElementById("overlayScreen").style.height = "0%";

                                $scope.validation = [];
                                $scope.validation.push("The email address format is invalid or is already in use.");
                                $scope.status ='';
                            });
                    }
                };

                function isFormValid() {
                    $scope.validation = [];

                    if (!$scope.firstName) {
                        $scope.validation.push("First Name is a required field");
                    }

                    if (!$scope.email) {
                        $scope.validation.push("Email is a required field");
                    }

                    if (!$scope.password) {
                        $scope.validation.push("Password is a required field");
                    }

                    if ($scope.password !== $scope.password2) {
                        $scope.validation.push("Password fields must match");
                    }

                    if ($scope.validation.length >= 1) {
                        console.log('form not valid');
                        return false;
                    }

                    return true;
                }

            }]);


}());
