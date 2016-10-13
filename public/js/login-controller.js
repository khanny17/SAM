(function () {
    'use strict';

    angular.module('LoginControllerModule', ['AuthModule'])
    .controller('loginController', ['$scope', 'AuthService', '$state', function($scope, AuthService, $state) {
        $scope.user = {
            email: '',
            password: ''
        };

        $scope.login = function() {
            AuthService.login($scope.user)
            .then(function() {
                $state.go('home');
            }, function(errMsg) {
                console.err(errMsg);
            });
        };
    }]);
}());
