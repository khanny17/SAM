(function () {
    'use strict';

    angular.module('ViewPapersControllerModule',  ['AuthModule'])

    .controller('viewPapersController', ['$scope', '$http','AuthService','$state', function($scope, $http, AuthService,$state) {

        $scope.papers = [];
        $scope.title = "SAM 2017 - Submit Paper";
        $scope.contactAuthor = AuthService.authenticatedUser().FirstName +" " + AuthService.authenticatedUser().LastName;
        $scope.userID =  AuthService.authenticatedUser().ID;
        $scope.loadingPaper = true;

        document.getElementById("overlayScreen").style.width = "100%";
        document.getElementById("overlayScreen").style.height = "100%";

        $http.get('services/paper/get-papers', {params: { userID:  $scope.userID }})
        .then(function(response){
            $scope.papers = response.data.paperList;
            $scope.loadingPapers = false;
            document.getElementById("overlayScreen").style.width = "0%";
            document.getElementById("overlayScreen").style.height = "0%";
        });


    }]);

}());
