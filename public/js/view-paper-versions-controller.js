(function () {
    'use strict';

    angular.module('ViewPaperVersionsControllerModule',  ['AuthModule'])

        .controller('viewPaperVersionsController', ['$scope', '$http','AuthService','$state','$stateParams', function($scope, $http, AuthService,$state,$stateParams) {

            $scope.paperID=$stateParams.paperID;
            $scope.versions = [];
            $scope.paper = null;
            $scope.title = "SAM 2017 - Paper Version History";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName +" " + AuthService.authenticatedUser().LastName;
            $scope.userID =  AuthService.authenticatedUser().ID;
            $scope.loadingPaper = true;

            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/paper/get-paper-versions', {params: { userID:  $scope.userID, paperID: $scope.paperID}})
                .then(function(response){
                    $scope.versions = response.data.versions;
                    $scope.paper = response.data.paper;

                    $scope.loadingPapers = false;
                    document.getElementById("overlayScreen").style.width = "0%";
                    document.getElementById("overlayScreen").style.height = "0%";
                });

            $scope.updatePaperCurrentVersion = function(version) {
                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";

                $http.post('services/paper/update-paper-current-version', {params: { paperId: $scope.paperID, version:  version }})
                    .then(function(){

                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                        $state.go('inside.view-papers');
                    });
            };

        }]);

}());
