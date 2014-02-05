'use strict';

var app = angular.module('notificationServices', []);

app.factory('notificationService', [function () {
  return {
    errors: [],

    error: function (error) {
      this.errors.push(error);
    }
  };
}]);

