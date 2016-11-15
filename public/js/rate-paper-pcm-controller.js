(function () {
    'use strict';

    angular.module('RatePaperPCMControllerModule',  ['AuthModule'])

        .controller('ratePaperPCMController', ['$scope', '$http','AuthService','$state','$stateParams', function($scope, $http, AuthService,$state,$stateParams) {

            $scope.paperID=$stateParams.paperID;
            $scope.paperVersion=$stateParams.version;
            $scope.paper='';
            $scope.title = "SAM 2017 - PCM Review & Rate Paper";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName +" " + AuthService.authenticatedUser().LastName;
            $scope.userID =  AuthService.authenticatedUser().ID;
            $scope.loadingPaper = true;


            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/paper/get-paper-by-version', {params: {paperID: $scope.paperID, version:$scope.paperVersion }})
                .then(function(response){
                    $scope.paper = response.data.paper;
                    $scope.loadingPapers = false;
                    document.getElementById("overlayScreen").style.width = "0%";
                    document.getElementById("overlayScreen").style.height = "0%";

                });


            $scope.updatePaper = function() {
                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";

                $http.post('services/paper/update-paper', $scope.paper)
                    .then(function(){

                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                        $state.go('inside.view-papers');
                    });
            };


        }]);

}());
