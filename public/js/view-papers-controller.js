(function () {
    'use strict';

    angular.module('ViewPapersControllerModule',  ['AuthModule'])

    .controller('viewPapersController', ['$scope', '$http','AuthService','$state', function($scope, $http, AuthService,$state) {

        $scope.papers = [];
        $scope.title = "SAM 2017 - Submit Paper";
        $scope.contactAuthor = AuthService.authenticatedUser().FirstName +" " + AuthService.authenticatedUser().LastName;
        $scope.userID =  AuthService.authenticatedUser().ID;

        $http.get('services/paper/get-papers', {params: { userID:  $scope.userID }})
        .then(function(response){
            $scope.papers = response.data;
            $scope.loadingPapers = false;
        });


    }]);

}());
