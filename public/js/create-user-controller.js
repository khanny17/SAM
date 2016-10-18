(function () {
    'use strict';

    angular.module('CreateUserControllerModule', [])

        .controller('createUserController', ['$scope', 'AuthService', '$state', 
            function($scope, AuthService, $state) {

            $scope.title = "SAM 2017 - User Registration";

            $scope.createUser = function() {
                if (isFormValid()) {

                    $scope.status = "Creating User....";
                    AuthService.register({
                        email: $scope.email,
                        password: $scope.password,
                        firstName: $scope.firstName,
                        lastName: $scope.lastName
                    }).then(function (response) {
                        var user = response.data;
                        $scope.status = "User Created";
                        $state.go('home');
                    }, function(error) {
                        $scope.status = error;
                    });
                }
            };

            function isFormValid()
            {
                if (($scope.email) && ($scope.password) && ($scope.firstName)) {
                    console.log('form  valid');
                    return true;
                }
                return false;
            }

        }]);

}());
