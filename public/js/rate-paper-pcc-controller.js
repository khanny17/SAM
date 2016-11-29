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


            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/submission/get-submission-by-id', {params: {submissionId: $scope.submissionID}})
                .then(function (response) {
                    $scope.paper = response.data.submission[0];
                    $scope.paperID = $scope.paper[0].PaperId;

                    $http.get('services/review/get-all-reviews-by-submission-id', {params: {submissionId: $scope.submissionID}})
                        .then(function(response){
                            $scope.reviews = response.data.reviews[0];
                            document.getElementById("overlayScreen").style.width = "0%";
                            document.getElementById("overlayScreen").style.height = "0%";
                            $scope.loadingPapers = false;
                        });
                });


            $scope.ratePaper = function () {
                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";
                var review_document = $scope.reviewDocument;
                var review_paperFormat = $scope.format;
                var review_id = $scope.reviewID;
                var review_rating = $scope.reviewRating;
                var review_comment = $scope.reviewComment;
                var review_submissionID = $scope.paper[0].SubmissionId;
                var review_pcmID = $scope.userID;
                var paper_id = $scope.paperID;

                $http.post('services/review/submit-pcm-review', {
                    params: {
                        review_id: review_id,
                        review_rating: review_rating,
                        review_comment: review_comment,
                        review_submissionID: review_submissionID,
                        review_pcmID: review_pcmID,
                        paper_id:paper_id,
                        review_document:review_document,
                        review_paperFormat: review_paperFormat
                    }
                })
                    .then(function (response) {

                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                        $state.go('inside.view-papers-pcm');
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


        }]);

}());
