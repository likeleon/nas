"use strict";

var app = angular.module('filesMockServices', []);

app.factory('filesService', function ($rootScope) {
  var events = {
    'files': [],
    'listFiles': []
  };

  return {
    onFiles: function (callback) {
      events.files.push(callback)
    },

    listFiles: function (path) {
      _.forEach(events.listFiles, function (event) {
        event(path);
      });
    },

    emitFiles: function (path) {
      angular.forEach(events.files, function (event) {
        $rootScope.$apply(function () {
          event(path);
        })
      });
    },

    onListFiles: function (callback) {
      events.listFiles.push(callback);
    }
  };
});
