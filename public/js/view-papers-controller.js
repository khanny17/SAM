(function () {
    'use strict';

    angular.module('ViewPapersControllerModule', [])

    .controller('viewPapersController', ['$scope', '$http', function($scope, $http){

        $scope.papers = [];
        $scope.loadingPapers = true;

        $http.get('services/paper/get-papers')
        .then(function(response){
            $scope.papers = response.data;
            $scope.loadingPapers = false;
        });


    }]);

}());
