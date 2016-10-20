(function () {
    'use strict';

    angular.module('InsideControllerModule', ['AuthModule'])

    .controller('insideController', ['$scope', '$state', 'AuthService',  function($scope, $state, AuthService) {
        
        $scope.title = "SAM 2017";

        $scope.logout = function() {
            AuthService.logout(); 
            $state.go('login');
        };

    }]);

}());
