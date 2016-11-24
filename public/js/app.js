(function () {
    'use strict';

    angular.module('SAMApp', [
        'ui.router',

        'SAMRoutes',
        'AuthModule',

        'FileReadDirective',

        'HomeControllerModule',
        'InsideControllerModule',
        'SubmitPaperControllerModule',
        'ViewPapersControllerModule',
        'CreateUserControllerModule',
        'ViewUserControllerModule',
        'LoginControllerModule',
        'UpdatePaperControllerModule',
        'UpdateUserRoleControllerModule',
        'ViewPapersPCCControllerModule',
        'RatePaperPCCControllerModule',
        'ViewPaperVersionsControllerModule',
        'ViewPapersPCMControllerModule',
        'RatePaperPCMControllerModule',
        'SetPaperPreferencePCMControllerModule',
        'ManageDeadlinesControllerModule'
    ]);
}());
