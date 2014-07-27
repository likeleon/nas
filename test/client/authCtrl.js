"use strict";

describe('AuthCtrl', function () {
  var scope, ctrl, $httpBackend, $window;

  beforeEach(function () {
    module("nas");
    module("filesMockServices");

    inject(function ($rootScope, $controller, $injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.whenGET('partials/files.html').respond({});

      scope = $rootScope.$new();
      $window = {
        location: { href: '' },
        alert: sinon.spy()
      };

      ctrl = $controller("AuthCtrl", {
        $scope: scope,
        $window: $window
      });
    })
  });

  it('should log in users with correct email / pass', function () {
    $httpBackend.expectPOST('/api/user/auth').respond({id: 'abc', token: 'abc'});
    scope.auth();
    $httpBackend.flush();
    sinon.assert.notCalled($window.alert);
  });

  it('should not log in users with incorrect email / pass', function () {
    $httpBackend.expectPOST('/api/user/auth').respond(404, '');
    scope.auth();
    $httpBackend.flush();
    sinon.assert.calledOnce($window.alert);
  });
});