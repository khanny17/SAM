(function () {
    'use strict';

    angular.module('SAMApp', [
        'ui.router',

        'SAMRoutes',
        'AuthModule',

        'HomeControllerModule',
        'SubmitPaperControllerModule',
        'ViewPapersControllerModule',
        'CreateUserControllerModule',
        'ViewUserControllerModule',
        'LoginControllerModule'
    ]);
}());
