(function () {
    'use strict';

    angular.module('SubmitPaperControllerModule', [])

    .controller('submitPaperController', ['$scope', '$http', function($scope, $http) {
        
        $scope.paper = {};

        $scope.submitPaper = function() {
            //TODO post request with $scope.paper as data
            $http.post('api/paper/create-paper', $scope.paper)
            .then(function(response){
                //TODO go to a different page
                $scope.paperCreated = true;
            });
        };


    }]);

}());
