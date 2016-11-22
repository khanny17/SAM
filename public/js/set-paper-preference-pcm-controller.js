(function () {
    'use strict';

    angular.module('SetPaperPreferencePCMControllerModule',  ['AuthModule'])

        .controller('setPaperPreferencePCMController', ['$scope', '$http','AuthService','$window', function($scope, $http, AuthService, $window) {

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


            $scope.submitPreference = function(submissionId) {
                var result = $window.confirm("Paper preference cannot be reverted. Proceed with preference?");
                if(result !== true) {
                    return;
                }

                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";

                $http.post('services/paperPreference/set-paper-preference', {
                    params: {
                        pcmid: $scope.userID,
                        submissionId: submissionId
                    }
                })
                    .then(function(){
                        //TODO go to a different page
                        $scope.paperCreated = true;

                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                        $state.go('inside.home');
                    });
            };

        }]);

}());
