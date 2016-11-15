'use strict'; 

angular.module('FileReadDirective', [])

    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    //reader.onload = function (loadEvent) {
                    //    scope.$apply(function () {
                    //        scope.fileread = loadEvent.target.result;
                    //    });
                    //};
                    reader.onloadend = function() {
                        var dataUrl = reader.result;
                        var base64 = dataUrl.split(',')[1];
                        scope.$apply(function() {
                            scope.fileread = base64;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    }]);
