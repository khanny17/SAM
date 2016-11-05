(function () {
    'use strict';

    angular.module('LoginControllerModule', ['AuthModule'])
    .controller('loginController', ['$scope', 'AuthService', '$state', function($scope, AuthService, $state) {
        $scope.user = {
            email: '',
            password: ''
        };

        $scope.login = function() {
            document.getElementById("overlayScreen").style.width = "100%";
            document.getElementById("overlayScreen").style.height = "100%";

            AuthService.login($scope.user)
            .then(function() {
                document.getElementById("overlayScreen").style.width = "0%";
                document.getElementById("overlayScreen").style.height = "0%";

                $state.go('inside.home');
            }, function(errMsg) {
                document.getElementById("overlayScreen").style.width = "0%";
                document.getElementById("overlayScreen").style.height = "0%";

                console.log(errMsg);
            });
        };
    }]);
}());
