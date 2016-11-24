(function () {
    'use strict';

    angular.module('SetPaperPreferencePCMControllerModule', ['AuthModule'])

        .controller('setPaperPreferencePCMController', ['$scope', '$http', 'AuthService', '$window', '$state', function ($scope, $http, AuthService, $window, $state) {

            $scope.myPreferredPapers = [];
            $scope.availablePapers = [];
            $scope.title = "SAM 2017 - PCM Set Paper Preference";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName + " " + AuthService.authenticatedUser().LastName;
            $scope.userID = AuthService.authenticatedUser().ID;
            $scope.deadlinePassed = false;

            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/deadline/get-is-deadline-passed', {params: {deadline_name: 'Review Selection Deadline'}})
                .then(function (response) {
                    if (response.data.status) {
                        $scope.deadlinePassed = true;
                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";
                        return;
                    }
                    $http.get('services/paperPreference/get-my-paper-preferences', {params: {userID: $scope.userID}})
                        .then(function (response) {
                            $scope.myPreferredPapers = response.data.preferences[0];

                            $http.get('services/paperPreference/get-all-paper-preferences', {params: {userID: $scope.userID}})
                                .then(function (response) {
                                    var data = response.data.preferences[0];
                                    for (var i = data.length - 1; i >= 0; i--) {
                                        for (var j = 0; j < $scope.myPreferredPapers.length; j++) {
                                            if (data[i].SubmissionId == $scope.myPreferredPapers[j].PaperPreferenceSubmissionId) {
                                                data.splice(i, 1);
                                                break;
                                            }
                                        }
                                    }
                                    $scope.availablePapers = data;
                                    document.getElementById("overlayScreen").style.width = "0%";
                                    document.getElementById("overlayScreen").style.height = "0%";
                                });
                        });
                });


            $scope.submitPreference = function (submissionId) {
                var result = $window.confirm("Paper preference cannot be reverted. Proceed with preference?");
                if (result !== true) {
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
                    .then(function () {
                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                        $state.go('inside.set-paper-preference-pcm');
                        $window.location.reload();
                    });
            };

        }]);

}());
