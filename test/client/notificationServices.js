'use strict';

describe('notificationServices', function () {
  var notification;

  beforeEach(function () {
    module('notificationServices');

    inject(function ($injector) {
      notification = $injector.get('notificationService');
    });
  });

  it('should not have any errors from start', function () {
    notification.errors.should.have.length(0);
  });

  describe('error()', function () {
    it('should add error to errors', function () {
      notification.error('error msg');
      notification.errors.should.have.length(1);
      notification.errors[0].should.equal('error msg');
    });
  });
});