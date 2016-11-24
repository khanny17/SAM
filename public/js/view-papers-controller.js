(function () {
    'use strict';

    angular.module('ViewPapersControllerModule',  ['AuthModule', 'ui.bootstrap'])

        .controller('viewPapersController', ['$scope', '$http','AuthService','$state','$window', '$uibModal',
            function($scope, $http, AuthService, $state, $window, $uibModal) {

                $scope.papers = [];
                $scope.title = "SAM 2017 - Submit Paper";
                $scope.contactAuthor = AuthService.authenticatedUser().FirstName +" " + AuthService.authenticatedUser().LastName;
                $scope.userID =  AuthService.authenticatedUser().ID;
                $scope.loadingPaper = true;
                $scope.deadlinePassed = false;

                document.getElementById("overlayScreen").style.width = "100%";
                document.getElementById("overlayScreen").style.height = "100%";

                $http.get('services/deadline/get-is-deadline-passed', {params: {deadline_name: 'Submission Deadline'}})
                    .then(function (response) {
                        if (response.data.status) {
                            $scope.deadlinePassed = true;
                            document.getElementById("overlayScreen").style.width = "0%";
                            document.getElementById("overlayScreen").style.height = "0%";
                        }
                        $http.get('services/paper/get-papers', {params: { userID:  $scope.userID }})
                            .then(function(response){
                                $scope.papers = response.data.paperList;
                                $scope.loadingPapers = false;
                                document.getElementById("overlayScreen").style.width = "0%";
                                document.getElementById("overlayScreen").style.height = "0%";
                            });
                    });



                $scope.submitPaper = function(paperId) {
                    var result = $window.confirm("Paper submission cannot be reverted. Proceed with submission?");
                    if(result !== true) {
                        return;
                    }

                    document.getElementById("overlayScreen").style.width = "100%";
                    document.getElementById("overlayScreen").style.height = "100%";

                    $http.post('services/paper/submit-paper',  {params: {paperId: paperId }})
                        .then(function(){

                            document.getElementById("overlayScreen").style.width = "0%";
                            document.getElementById("overlayScreen").style.height = "0%";


                            $state.reload();

                        });
                };

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

            }]);

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

}());



