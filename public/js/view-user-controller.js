(function () {
    'use strict';

    angular.module('ViewUserControllerModule', [])

        .controller('viewUserController', ['$scope', '$http', function($scope, $http) {

            $scope.title = "SAM 2017 - User Details";
            $scope.users = [];
            $scope.loadingUsers = true;

            $http.get('api/user/get-users')
                .then(function(response){
                    console.log('Get User Completed')
                    $scope.users = response.data;
                    $scope.loadingUsers = false;
                });

        }]);

}());
