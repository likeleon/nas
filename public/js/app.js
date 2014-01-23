"use strict";

var nas = angular.module('nas', ['ui.router', 'socketServices']);

nas.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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

window.nas = nas;