'use strict';

describe('notificationServices', function () {
  var notification, scope;

  beforeEach(function () {
    module('notificationServices');

    inject(function ($rootScope, $injector) {
      scope = $rootScope.$new();
      notification = $injector.get('notificationService');
    });
  });

  describe('error()', function () {
    it('should broadcast error event', function (done) {
      scope.$on('error', function (event, error) {
        error.should.equal('error message');
        done();
      });
      notification.error('error message');
    });
  });
});