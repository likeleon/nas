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
      scope.registrationForm = {};
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

  it('should create a new admin with valid email / pass', function () {
    $httpBackend.expectPOST('/api/user/register').respond({id: 'abc', token: 'abc'});
    scope.registrationForm.$invalid = false;
    scope.createAdmin();
    $httpBackend.flush();
    sinon.assert.notCalled($window.alert);
    $window.location.href.should.equal('/');
  });

  it('should register a new user with valid email / pass', function () {
    $httpBackend.expectPOST('/api/user/register').respond({id: 'abc', token: 'abc'});
    scope.registrationForm.$invalid = false;
    scope.register();
    $httpBackend.flush();
    sinon.assert.notCalled($window.alert);
    $window.location.href.should.equal('/');
  });

  it('should log in users with correct email / pass', function () {
    $httpBackend.expectPOST('/api/user/auth').respond({id: 'abc', token: 'abc'});
    scope.auth();
    $httpBackend.flush();
    sinon.assert.notCalled($window.alert);
    $window.location.href.should.equal('/');
  });

  it('should not log in users with incorrect email / pass', function () {
    $httpBackend.expectPOST('/api/user/auth').respond(404, '');
    scope.auth();
    $httpBackend.flush();
    sinon.assert.calledOnce($window.alert);
  });
});