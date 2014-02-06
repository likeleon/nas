'use strict';

describe('NotificationCtrl', function () {
  var scope, ctrl;

  beforeEach(function () {
    module('nas');

    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('NotificationCtrl', {
        $scope: scope
      });
    })
  });

  it('should have empty alerts from start', function () {
    scope.alerts.should.have.length(0);
  });

  it('should add new alert on error event', function () {
    scope.$emit('error', 'error message');
    scope.alerts.should.have.length(1);
    scope.alerts[0].type.should.equal('danger');
    scope.alerts[0].msg.should.equal('error message');
  });

  describe('closeAlert()', function () {
    it('should erase specified alert', function () {
      scope.$emit('error', '0');
      scope.$emit('error', '1');
      scope.alerts.should.have.length(2);

      scope.closeAlert(0);
      scope.alerts.should.have.length(1);
      scope.alerts[0].msg.should.equal('1');
    });
  });
});