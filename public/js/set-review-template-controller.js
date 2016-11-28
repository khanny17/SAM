(function () {
    'use strict';

    angular.module('SetReviewTemplateControllerModule', ['AuthModule'])

        .controller('setReviewTemplateController', ['$scope', '$http', 'AuthService', '$window','$state', function ($scope, $http, AuthService, $window, $state) {

            $scope.reviewTemplate = [];
            $scope.title = "SAM 2017 - Admin Set Review Template";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName + " " + AuthService.authenticatedUser().LastName;
            $scope.userID = AuthService.authenticatedUser().ID;


            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/templateReview/get-template-review')
                .then(function (response) {
                    $scope.reviewTemplate = response.data.templates;
                    document.getElementById("overlayScreen").style.width = "0%";
                    document.getElementById("overlayScreen").style.height = "0%";
                });


            $scope.updateTemplate = function () {

                var template_id = $scope.reviewTemplate[0].ID;
                var template_title = "PCM Review Template";
                var template_document = $scope.reviewTemplate[0].Document;
                var template_paperFormat = $scope.format;

                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";

                $http.post('services/templateReview/set-template-review', {
                    params: {
                        template_id: template_id,
                        template_title: template_title,
                        template_document:template_document,
                        template_paperFormat:template_paperFormat
                    }
                })
                    .then(function () {
                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";
                        $state.go('inside.home');
                    });
            };

            $scope.isValid = function(){
                return ($scope.reviewTemplate[0].Document && $scope.format);
            };

            $scope.downloadDocument = function(paper) {
                $http.get('services/templateReview/download-document', { params: { id: $scope.reviewTemplate[0].ID } })
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
