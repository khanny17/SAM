(function () {
    'use strict';

    angular.module('SubmitPaperControllerModule', ['AuthModule'])

    .controller('submitPaperController', ['$scope', '$http','AuthService','$state', function($scope, $http, AuthService,$state) {
        
        $scope.paper = {};
        $scope.title = "SAM 2017 - Submit Paper";
        $scope.users = [];
        $scope.contactAuthor = AuthService.authenticatedUser().FirstName +" " + AuthService.authenticatedUser().LastName;
        $scope.paper.userID =  AuthService.authenticatedUser().ID;
        $scope.paper.Status='Pending Submission';

/*
        $http.get('services/user/get-users')
            .then(function(response){
                console.log('Get User Completed');
                $scope.users = response.data;
                $scope.loadingUser = false;
            });
*/


        $scope.submitPaper = function() {
            $http.post('services/paper/create-paper', $scope.paper)
            .then(function(){
                //TODO go to a different page
                $scope.paperCreated = true;
                $state.go('inside.home');
            });
        };


    }]);

}());
