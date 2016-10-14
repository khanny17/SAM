(function () {
    'use strict';

    angular.module('CreateUserControllerModule', [])

        .controller('createUserController', ['$scope', '$http', function($scope, $http) {

            $scope.title = "SAM 2017 - User Registration";

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
                            $scope.users.push(response.data);
                            var user = response.data;
                            console.log(user.ID);
                            $scope.status = "User Created! User Id:"+user.ID;
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
