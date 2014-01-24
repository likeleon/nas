"use strict";

var nas = angular.module('nas', ['ui.router', 'socketServices']);

nas.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise('/files');

    $stateProvider
        .state('files', {
            url: '/files',
            templateUrl: 'partials/files.html'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'partials/about.html'
        });
}]);

nas.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
}]);

window.nas = nas;