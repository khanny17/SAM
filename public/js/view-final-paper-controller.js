(function () {
    'use strict';

    angular.module('ViewFinalPaperControllerModule', ['AuthModule'])

        .controller('viewFinalPaperController', ['$scope', '$http', 'AuthService', '$state', '$stateParams', function ($scope, $http, AuthService, $state, $stateParams) {

            $scope.submissionID ='';
            $scope.paper = '';
            $scope.title = "SAM 2017 - View Final Paper";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName + " " + AuthService.authenticatedUser().LastName;
            $scope.userID = AuthService.authenticatedUser().ID;
            $scope.loadingPaper = true;
            $scope.paperID = '';
            $scope.reviews = [];
            $scope.reviewRating='';
            $scope.reviewComment = '';
            $scope.submitDisabled = false;

            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/submission/get-submission-by-paperId', {params: {paperId:  $stateParams.paperID}})
                .then(function (response) {
                    $scope.submissionID = response.data.submission["0"]["0"].SubmissionId;
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


        }]);

}());
