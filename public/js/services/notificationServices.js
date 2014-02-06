'use strict';

var app = angular.module('notificationServices', []);

app.factory('notificationService', ['$rootScope', function ($rootScope) {
  return {
    error: function (error) {
      $rootScope.$broadcast('error', error);
    }
  };
}]);

