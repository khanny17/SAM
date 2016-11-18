(function () {
    'use strict';

    angular.module('SetPaperPreferencePCMControllerModule',  ['AuthModule'])

        .controller('setPaperPreferencePCMController', ['$scope', '$http','AuthService', function($scope, $http, AuthService) {

            $scope.papers = [];
            $scope.title = "SAM 2017 - PCM Set Paper Preference";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName +" " + AuthService.authenticatedUser().LastName;
            $scope.userID =  AuthService.authenticatedUser().ID;
            $scope.loadingPaper = true;

            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/submission/get-all-submissions')
                .then(function(response){
                    $scope.papers = response.data.submissions[0];
                    $scope.loadingPapers = false;
                    document.getElementById("overlayScreen").style.width = "0%";
                    document.getElementById("overlayScreen").style.height = "0%";
                });

        }]);

}());
