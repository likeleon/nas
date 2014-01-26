"use strict";

var nas = angular.module('nas', ['ui.router', 'filesServices']);

nas.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise('/files');

    $stateProvider
        .state('files', {
            url: '/files',
            templateUrl: 'partials/files.html',
            onEnter: function(filesService) {
                filesService.listFiles('');
            }
        })

        .state('about', {
            url: '/about',
            templateUrl: 'partials/about.html'
        });
});

nas.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

window.nas = nas;