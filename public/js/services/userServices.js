'use strict';

var app = angular.module('userServices', []);

app.factory('userService', ['$rootScope', '$http', '$location', 'STORAGE_USER_ID', 'STORAGE_SETTINGS_ID',
  function ($rootScope, $http, $location, STORAGE_USER_ID, STORAGE_SETTINGS_ID) {
    var defaultSettings = {
      auth : {
        apiId: ''
      }
    };
    var settings = {};
    var user = {};

    user.id = '';
    if (localStorage.getItem(STORAGE_USER_ID)) {
      _.extend(user, JSON.parse(localStorage.getItem(STORAGE_USER_ID)));
    }

    var save = function () {
      localStorage.setItem(STORAGE_USER_ID, JSON.stringify(user));
      localStorage.setItem(STORAGE_SETTINGS_ID, JSON.stringify(settings));
    };

    var userService = {
      user: user,
      settings: settings,
      authenticate: function (uuid, cb) {
        if (!uuid) {
          alert('Failed to authenticate, uuid missing.');
          return;
        }

        $http.defaults.headers.common['x-api-user'] = uuid;
        settings.auth.apiId = uuid;

        save();
        cb && cb();
      },
      save: save
    };

    if (!localStorage.getItem(STORAGE_SETTINGS_ID)) {
      localStorage.setItem(STORAGE_SETTINGS_ID, JSON.stringify(defaultSettings));
    }
    _.extend(settings, JSON.parse(localStorage.getItem(STORAGE_SETTINGS_ID)));

    if (settings.auth.apiId) {
      userService.authenticate(settings.auth.apiId);
    }

    return userService;
  }]);
