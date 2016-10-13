(function () {
    'use strict';

    angular.module('SubmitPaperControllerModule', [])

    .controller('submitPaperController', ['$scope', '$http', function($scope, $http) {
        
        $scope.paper = {};
        $scope.title = "SAM 2017 - User Details";
        $scope.users = [];
        $scope.loadingUser = true;

        $http.get('services/user/get-users')
            .then(function(response){
                console.log('Get User Completed')
                $scope.users = response.data;
                $scope.loadingUser = false;
            });


        $scope.submitPaper = function() {
            $http.post('services/paper/create-paper', $scope.paper)
            .then(function(response){
                //TODO go to a different page
                $scope.paperCreated = true;
            });
        };


    }]);

}());
