(function () {
    'use strict';

    angular.module('CreateUserControllerModule', [])

        .controller('createUserController', ['$scope', '$http', function($scope, $http) {

            $scope.title = "SAM 2017 - User Registration";

            $http.get('api/user/get-users')
                .then(function(response){
                    $scope.users = response.data; //data is whatever we sent from the node api
                });


            $scope.createUser = function() {
                if (isFormValid()) {
                    $http.post('api/user/create', {
                        email: $scope.email,
                        password: $scope.password,
                        firstName: $scope.firstName,
                        lastName: $scope.lastName
                    })
                        .then(function (response) {
                            $scope.users.push(response.data);
                            var user = response.data;
                            console.log(user.ID);
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
