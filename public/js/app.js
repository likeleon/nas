"use strict";

var nas = angular.module('nas', ['ui.router', 'socketServices']);

nas.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise('/files');

    $stateProvider
        .state('files', {
            url: '/files',
            templateUrl: 'partials/main.html'
        });
}]);

window.nas = nas;