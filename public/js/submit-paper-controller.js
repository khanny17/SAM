(function () {
    'use strict';

    angular.module('SubmitPaperControllerModule', ['AuthModule'])

    .controller('submitPaperController', ['$scope', '$http','AuthService','$state', function($scope, $http, AuthService,$state) {
        
        $scope.paper = {};
        $scope.title = "SAM 2017 - Submit Paper";
        $scope.users = [];
        $scope.PCCs = [];
        $scope.contactAuthor = AuthService.authenticatedUser().FirstName +" " + AuthService.authenticatedUser().LastName;
        $scope.paper.userID =  AuthService.authenticatedUser().ID;
        $scope.paper.Status='Pending Submission';
        $scope.deadlinePassed = false;


        document.getElementById("overlayScreen").style.width = "100%";
        document.getElementById("overlayScreen").style.height = "100%";

        $http.get('services/deadline/get-is-deadline-passed', {params: {deadline_name: 'Submission Deadline'}})
            .then(function (response) {
                if (response.data.status) {
                    $scope.deadlinePassed = true;
                }
                document.getElementById("overlayScreen").style.width = "0%";
                document.getElementById("overlayScreen").style.height = "0%";
            });

        $http.get('services/user/get-pccs')
            .then(function (response) {
                for(var i=0;i<response.data.length;i++){
                    $scope.PCCs.push(response.data[i].ID);
                }
            });



        $scope.isValid = function(){
            return ($scope.paper.Document && $scope.format);
        };

        $scope.submitPaper = function() {

            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $scope.paper.PaperFormat = $scope.format;

            $http.post('services/paper/create-paper', $scope.paper)
            .then(function(){
                $http.post('services/notification/create-notification',
                    {
                        Text: 'New Paper Notification: '+$scope.contactAuthor+' created a new paper',
                        userIds: $scope.PCCs
                    })
                    .then(function(){
                        $http.post('services/notification/create-notification',
                            {
                                Text: 'New Paper Notification: Your paper has been created. Please remember to submit it.',
                                userIds: [ $scope.paper.userID]
                            })
                        $scope.paperCreated = true;

                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                        $state.go('inside.home');
                    });
            });
        };


    }]);

}());
