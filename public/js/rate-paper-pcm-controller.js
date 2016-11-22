(function () {
    'use strict';

    angular.module('RatePaperPCMControllerModule', ['AuthModule'])

        .controller('ratePaperPCMController', ['$scope', '$http', 'AuthService', '$state', '$stateParams', function ($scope, $http, AuthService, $state, $stateParams) {

            $scope.submissionID = $stateParams.submissionId;
            $scope.paper = '';
            $scope.title = "SAM 2017 - PCM Review & Rate Paper";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName + " " + AuthService.authenticatedUser().LastName;
            $scope.userID = AuthService.authenticatedUser().ID;
            $scope.loadingPaper = true;

            $scope.reviewComment = '';
            $scope.reviewRating = '';
            $scope.reviewID = '';


            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/review/get-my-review-by-submission-id', {params: {submissionId: $scope.submissionID, userID: $scope.userID}})
                .then(function (response) {
                    if (response.data.review != null && response.data.review[0].length>0) {
                        $scope.paper = response.data.review[0];
                        $scope.reviewID = $scope.paper[0].ReviewId;
                        $scope.reviewRating = $scope.paper[0].ReviewRating;
                        $scope.reviewComment = $scope.paper[0].ReviewComment;
                    }
                    else {
                        $http.get('services/submission/get-submission-by-id', {params: {submissionId: $scope.submissionID}})
                            .then(function(response){
                                $scope.paper = response.data.submission[0];
                            });
                    }
                    $scope.loadingPapers = false;
                    document.getElementById("overlayScreen").style.width = "0%";
                    document.getElementById("overlayScreen").style.height = "0%";
                });


            $scope.ratePaper = function () {
                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";

                var review_id = $scope.reviewID;
                var review_rating = $scope.reviewRating;
                var review_comment = $scope.reviewComment;
                var review_submissionID = $scope.paper[0].SubmissionId;
                var review_pcmID = $scope.userID;

                $http.post('services/review/submit-pcm-review', {
                    params: {
                        review_id: review_id,
                        review_rating: review_rating,
                        review_comment: review_comment,
                        review_submissionID: review_submissionID,
                        review_pcmID: review_pcmID
                    }
                })
                    .then(function (response) {

                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                        $state.go('inside.view-papers-pcm');
                    });
            };


        }]);

}());
