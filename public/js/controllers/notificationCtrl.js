'use strict';

nas.controller('NotificationCtrl', ['$scope',
  function ($scope) {
    $scope.alerts = [];

    $scope.$on('error', function (event, error) {
      $scope.alerts.push({ type: 'danger', msg: error});
    });

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.addAlert = function () {
      $scope.$emit('error', 'Oh snap! Change a few things up and try submitting again.');
    };
  }
]);