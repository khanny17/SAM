(function () {
    'use strict';

    angular.module('RatePaperPCCControllerModule', ['AuthModule'])

        .controller('ratePaperPCCController', ['$scope', '$http', 'AuthService', '$state', '$stateParams', function ($scope, $http, AuthService, $state, $stateParams) {

            $scope.submissionID = $stateParams.submissionId;
            $scope.paper = '';
            $scope.title = "SAM 2017 - PCC Review & Rate Paper";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName + " " + AuthService.authenticatedUser().LastName;
            $scope.userID = AuthService.authenticatedUser().ID;
            $scope.loadingPaper = true;
            $scope.paperID = '';
            $scope.reviews = [];
            $scope.reviewRating;
            $scope.reviewComment = '';
            $scope.submitDisabled = false;

            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/submission/get-submission-by-id', {params: {submissionId: $scope.submissionID}})
                .then(function (response) {
                    $scope.paper = response.data.submission[0];
                    $scope.paperID = $scope.paper[0].PaperId;

                    if($scope.paper[0].PaperStatus=='Review Conflict'){
                      $scope.submitDisabled = true;
                    }

                    $http.get('services/review/get-all-reviews-by-submission-id', {params: {submissionId: $scope.submissionID}})
                        .then(function(response){
                            $scope.reviews = response.data.reviews[0];
                            console.log($scope.reviews);
                            document.getElementById("overlayScreen").style.width = "0%";
                            document.getElementById("overlayScreen").style.height = "0%";
                            $http.get('services/pcc-review/get-pcc-review-by-submissionId',{params: {submissionId: $scope.submissionID}})
                              .then(function(response){

                                if(response.data.pccReviews.length==1){
                                  $scope.reviewRating = response.data.pccReviews[0].Rating;
                                  $scope.reviewComment = response.data.pccReviews[0].Comment;
                                  //disable submit and conflict buttons
                                }
                              });
                            $scope.loadingPapers = false;
                        });
                });


            $scope.ratePaper = function () {
                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";
                // var review_document = $scope.reviewDocument;
                // var review_paperFormat = $scope.format;
                // var review_id = $scope.reviewID;
                var review_rating = $scope.reviewRating;
                var review_comment = $scope.reviewComment;
                var review_submissionID = $scope.paper[0].SubmissionId;
                // var review_pcmID = $scope.userID;
                var paper_id = $scope.paperID;

                $http.post('services/pcc-review/submit-pcc-review', {
                    params: {
                        // review_id: review_id,
                        review_rating: review_rating,
                        review_comment: review_comment,
                        review_submissionID: review_submissionID,
                        // review_pcmID: review_pcmID,
                         paper_id:paper_id
                        // review_document:review_document,
                        // review_paperFormat: review_paperFormat
                    }
                })
                    .then(function (response) {

                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                        $http.post('services/notification/create-notification',
                            {
                                Text: 'Final rating for paper ' + $scope.paper[0].PaperTitle+' has been updated. Final Rating: '+$scope.reviewRating,
                                userIds: [$scope.paper[0].PaperAuthorId]
                            })
                            .then(function () {
                              console.log("notification sent!");
                            });

                        $state.go('inside.view-papers-pcc');

                    });
            };

            $scope.isValid = function(){
                return ($scope.reviewDocument && $scope.format);
            };

            $scope.downloadDocument = function(paperId) {
                $http.get('services/paper/download-document', { params: { paperID: paperId } })
                    .then(function(response) {
                        var blob = b64toBlob(response.data.file, 'application/octet-stream');
                        var url = URL.createObjectURL(blob);
                        var a = document.createElement('a');
                        a.href = url;
                        a.download = response.data.fileName;
                        a.click();
                        URL.revokeObjectURL(url);
                    });
            };

            $scope.downloadReviewDocument = function(reviewId) {
                var fileName = $scope.paper[0].PaperTitle + "--Review-" + $scope.contactAuthor;
                $http.get('services/review/download-document', { params: { id: reviewId, fileName:fileName } })
                    .then(function(response) {
                        var blob = b64toBlob(response.data.file, 'application/octet-stream');
                        var url = URL.createObjectURL(blob);
                        var a = document.createElement('a');
                        a.href = url;
                        a.download = response.data.fileName;
                        a.click();
                        URL.revokeObjectURL(url);
                    });
            };


            function b64toBlob(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                var byteCharacters = atob(b64Data);
                var byteArrays = [];

                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                var blob = new Blob(byteArrays, {type: contentType});
                return blob;
            }

            $scope.sendConflictNotification = function(){
              console.log("In sendConflictNotification");
              $scope.submitDisabled=true;
              $http.post('services/paper/update-paper-status',
             {
               params: {
                 paperID: $scope.paperID,
                 status: "Review Conflict"
               }
             }).then(function(response){
               console.log(response.data.success);
               var pcms = [];
               for (var i in $scope.reviews) {
                 pcms.push( $scope.reviews[i].ReviewPCMId);
               }
               console.log(pcms);
               $http.post('services/notification/create-notification',
                   {
                       Text: 'Paper review conflict notification for  paper ' + $scope.paper[0].PaperTitle+',for author '+$scope.paper[0].UserFirstName+' '+$scope.paper[0].UserLastName +'.',
                       userIds: pcms
                   })
                   .then(function () {
                     console.log("notification sent!");
                     $state.go('inside.view-papers-pcc');
                   });
             });
            }


        }]);

}());
