(function () {
    'use strict';

    angular.module('HomeControllerModule', [])

    .controller('homeController', ['$scope', '$http', function($scope, $http) {
        
        $scope.title = "SAM 2017";

        $http.get('api/user/get-users')
        .then(function(response){
            $scope.users = response.data; //data is whatever we sent from the node api
        });


        $scope.createUser = function() {
            $http.post('api/user/create', { 
                firstName: $scope.firstName, 
                lastName: $scope.lastName
            })
            .then(function(response){
                $scope.users.push(response.data);  
            });
        };

    }]);

}());
