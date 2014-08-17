'use strict';

var nas = angular.module('nas', ['ui.router', 'ui.bootstrap', 'userServices', 'filesServices', 'notificationServices']);

nas.constant("STORAGE_USER_ID", 'nas-user');
nas.constant("STORAGE_SETTINGS_ID", 'nas-settings');

nas.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/files/');

  $stateProvider
    .state('files', {
      abstract: true,
      url: '/files',
      templateUrl: 'partials/files.html',
      controller: 'FilesCtrl'
    })
    .state('files.detail', {
      url: '/{path:.*}',
      onEnter: function (filesService, $stateParams) {
        var path = $stateParams.path || '';
        filesService.listFiles(path);
      }
    })

    .state('about', {
      url: '/about',
      templateUrl: 'partials/about.html'
    });
});

nas.run(function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});

window.nas = nas;