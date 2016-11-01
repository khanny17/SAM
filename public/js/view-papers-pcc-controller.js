(function () {
    'use strict';

    angular.module('ViewPapersPCCControllerModule', ['AuthModule'])

    .controller('viewPapersPCCController', ['$scope', '$http','AuthService', function($scope, $http, AuthService){

      $scope.papers = [];
      $scope.title = "SAM 2017 - View Papers";
      $scope.user =  AuthService.authenticatedUser();
      $scope.loadingPapers = true;

        $http.get('services/paper/get-all-papers').then(function(response){
            $scope.papers = response.data;
            $scope.loadingPapers = false;
        });
    }]);

}());
