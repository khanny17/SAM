(function () {
    'use strict';

    angular.module('SAMApp', [
        'ui.router',

        'SAMRoutes',

        'HomeControllerModule',
        'SubmitPaperControllerModule',
    ]);
}());
