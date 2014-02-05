'use strict';

var app = angular.module('notificationServices', []);

app.factory('notificationService', [function () {
  var growl = function (html, type) {
    $.bootstrapGrowl(html, {
      ele: '#notification-area', // which element to append to
      type: type, // (null, 'info', 'error', 'success')
      offset: {from: 'bottom', amount: 20}, // 'top', or 'bottom'
      align: 'center', // ('left', 'right', or 'center')
      width: 'auto', // (integer, or 'auto')
      delay: 4000,
      allow_dismiss: true,
      stackup_spacing: 10 // spacing between consecutively stacked growls.
    })
  };

  return {
    error: function (error) {
      growl('<i class="fa fa-exclamation-circle"></i> ' + error, 'error');
    }
  };
}]);

