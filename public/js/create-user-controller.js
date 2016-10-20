(function () {
    'use strict';

    angular.module('CreateUserControllerModule', [])

        .controller('createUserController', ['$scope', '$http', function($scope, $http) {

            $scope.title = "SAM 2017 - User Registration";
            $scope.validation = [];

            $http.get('services/user/get-users')
                .then(function(response){
                    $scope.users = response.data; //data is whatever we sent from the node services
                });


            $scope.createUser = function() {
                if (isFormValid()) {
                    $scope.status = "Creating User....";
                    $http.post('services/user/signup', {
                        email: $scope.email,
                        password: $scope.password,
                        firstName: $scope.firstName,
                        lastName: $scope.lastName
                    })
                        .then(function (response) {
                            if (response.data.success) {
                                $scope.users.push(response.data);
                                var user = response.data;
                                console.log(user.user.ID);
                                $scope.status = "User Created! User Id:" + user.user.ID;
                            }
                            else{
                                $scope.lines = [];
                                $scope.lines.push("The email address is already in use.");
                            }
                        });
                }
            };

            function isFormValid()
            {
                $scope.lines = [];

                if(!$scope.firstName) {
                    $scope.lines.push("First Name is a required field");
                }

                if(!$scope.email) {
                    $scope.lines.push("Email is a required field");
                }

                if(!$scope.password) {
                    $scope.lines.push("Password is a required field");
                }

                if($scope.password !== $scope.password2) {
                    $scope.lines.push("Password fields must match");
                }

                if ($scope.lines.length >= 1){
                    console.log('form not valid');
                    return false;
                }

                return true;
            }

        }]);


}());
