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
            $scope.reviewComment='';
            $scope.reviewRating='';
            $scope.reviewID='';
            $scope.submissionID='';


            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/paper/get-paper-by-version', {params: {paperID: $scope.paperID, version:$scope.paperVersion }})
                .then(function(response){
                    $scope.paper = response.data.paper;

                    $http.get('services/submission/get-submission', {params: {paperID: $scope.paperID}})
                        .then(function(response){
                            $scope.submissionID=response.data.submission.ID;

                            $http.get('services/review/get-my-review-by-submission-id', {params: {reviewSubmissionID: $scope.submissionID, userID:$scope.userID }})
                                .then(function(response){
                                    if (response.data.review != null) {
                                        $scope.reviewID = response.data.review.ID;
                                        $scope.reviewRating = response.data.review.Rating;
                                        $scope.reviewComment = response.data.review.Comment;
                                    }
                                    $scope.loadingPapers = false;
                                    document.getElementById("overlayScreen").style.width = "0%";
                                    document.getElementById("overlayScreen").style.height = "0%";
                                });
                        });
                });

            $scope.ratePaper = function() {
                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";

                var review_id = $scope.reviewID;
                var review_rating =  $scope.reviewRating;
                var review_comment = $scope.reviewComment;
                var review_submissionID =  $scope.submissionID;
                var review_pcmID = $scope.userID;

                $http.post('services/review/submit-pcm-review', {params: { review_id: review_id, review_rating:  review_rating,review_comment:review_comment,review_submissionID:review_submissionID,review_pcmID:review_pcmID }})
                    .then(function(response){

                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                        $state.go('inside.view-papers-pcm');
                    });
            };


        }]);

}());
