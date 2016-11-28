(function () {
    'use strict';

    angular.module('ManageDeadlinesControllerModule', ['AuthModule'])

        .controller('manageDeadlineController', ['$scope', '$http', 'AuthService', '$window','$state', function ($scope, $http, AuthService, $window, $state) {

            $scope.deadlines = [];
            $scope.title = "SAM 2017 - Admin Manage Deadlines";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName + " " + AuthService.authenticatedUser().LastName;
            $scope.userID = AuthService.authenticatedUser().ID;


            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/deadline/get-all-deadlines')
                .then(function (response) {
                    $scope.deadlines = response.data.deadlines;
                    document.getElementById("overlayScreen").style.width = "0%";
                    document.getElementById("overlayScreen").style.height = "0%";
                });


            $scope.updateDeadline = function (deadline) {
                var date_value = new Date().toJSON().slice(0,10);
                var result = $window.prompt("Please enter deadline date", date_value);
                if (result == null) {
                    return;
                }
                deadline.Date = result;

                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";

                $http.post('services/deadline/update-deadline-by-id', {
                    params: {
                        deadline_id: deadline.ID,
                        deadline_date: deadline.Date,
                        deadline_name:deadline.Deadline
                    }
                })
                    .then(function () {
                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                    });
            };

            $scope.setDefaultDeadlines = function(){
                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";

                $http.post('services/deadline/set-default-deadlines')
                    .then(function () {
                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                        $window.location.reload();
                    });
            };

        }]);

}());
