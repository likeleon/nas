'use strict';

var app = angular.module('userServices', []);

app.factory('userService', ['$rootScope', '$http', function ($rootScope, $http) {
  return {
    authenticate: function (uuid, cb) {
      if (!uuid) {
        alert('Failed to authenticate, uuid missing.');
        return;
      }

      $http.defaults.headers.common['x-api-user'] = uuid;
      cb && cb();
    }
  };
}]);
