(function () {
    'use strict';

    angular.module('UpdatePaperControllerModule',  ['AuthModule'])

        .controller('updatePaperController', ['$scope', '$http','AuthService','$state','$stateParams', function($scope, $http, AuthService,$state,$stateParams) {

            $scope.paperID=$stateParams.paperID;
            $scope.paper='';
            $scope.title = "SAM 2017 - Update Paper";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName +" " + AuthService.authenticatedUser().LastName;
            $scope.userID =  AuthService.authenticatedUser().ID;
            $scope.loadingPaper = true;

            $http.get('services/paper/get-paper', {params: { userID:  $scope.userID, paperID: $scope.paperID }})
                .then(function(response){
                    $scope.paper = response.data;
                    $scope.loadingPapers = false;
                });


            $scope.updatePaper = function() {
                $http.post('services/paper/update-paper', $scope.paper)
                    .then(function(){
                        $state.go('inside.home');
                    });
            };


        }]);

}());
