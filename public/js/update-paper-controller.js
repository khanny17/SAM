(function () {
    'use strict';

    angular.module('UpdatePaperControllerModule',  ['AuthModule'])

        .controller('updatePaperController', ['$scope', '$http','AuthService','$state','$stateParams', function($scope, $http, AuthService,$state,$stateParams) {

            $scope.paperID=$stateParams.paperID;
            $scope.paper='';
            $scope.title = "SAM 2017 - Update Paper";
            $scope.contactAuthor = AuthService.authenticatedUser().FirstName +" " + AuthService.authenticatedUser().LastName;
            $scope.userID =  AuthService.authenticatedUser().ID;
            $scope.loadingPaper = true;

            $scope.isValid = function(){
                return ($scope.paper.Document && $scope.format);
            };

            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            $http.get('services/paper/get-paper', {params: { userID:  $scope.userID, paperID: $scope.paperID }})
                .then(function(response){
                    $scope.paper = response.data.paper;
                    $scope.loadingPapers = false;
                    document.getElementById("overlayScreen").style.width = "0%";
                    document.getElementById("overlayScreen").style.height = "0%";

                });

            $scope.downloadDocument = function(paper) {
                $http.get('services/paper/download-document', { params: { paperID: paper.paperId } })
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

            $scope.updatePaper = function() {
                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";

                $http.post('services/paper/update-paper', $scope.paper)
                    .then(function(){

                        document.getElementById("overlayScreen").style.width = "0%";
                        document.getElementById("overlayScreen").style.height = "0%";

                        $state.go('inside.view-papers');
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
