(function () {
    'use strict';

    angular.module('ViewPapersPCMControllerModule', ['AuthModule'])

        .controller('viewPapersPCMController', ['$scope', '$http', 'AuthService', '$state', '$window', function ($scope, $http, AuthService, $state, $window) {

            $scope.papers = [];
            $scope.title = "SAM 2017 - PCM Review Paper";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName + " " + AuthService.authenticatedUser().LastName;
            $scope.userID = AuthService.authenticatedUser().ID;
            $scope.deadlinePassed = false;

            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/deadline/get-is-deadline-passed', {params: {deadline_name: 'Review Deadline'}})
                .then(function (response) {
                    if (response.data.status) {
                        $scope.deadlinePassed = true;
                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";
                        return;
                    }
                    $http.get('services/submission/get-my-assigned-submission-reviews', {params: {userID: $scope.userID}})
                        .then(function (response) {
                            $scope.papers = response.data.submissions[0];

                            document.getElementById("overlayScreen").style.width = "0%";
                            document.getElementById("overlayScreen").style.height = "0%";
                        });
                });
        }]);
}());
