'use strict';

nas.controller("AuthCtrl", ['$scope', '$http', '$window', 'userService',
  function ($scope, $http, $window, userService) {
    var runAuth;

    $scope.rememberMe = false;
    $scope.registerVals = {
      email: "",
      password: "",
      confirmPassword: "",
      admin: false
    };

    function errorAlert (data, status, headers, config) {
      if (status === 0) {
        $window.alert('Server not currently reachable, try again later');
      } else if (!!data && !!data.err) {
        $window.alert(data.err);
      } else {
        $window.alert('ERROR: ' + status);
      }
    }

    runAuth = function (id) {
      userService.authenticate(id, function (err) {
        $window.location.href = '/';
      })
    };

    $scope.auth = function () {
      var data = {
        email: $scope.loginEmail,
        password: $scope.loginPassword
      };

      $http.post('/api/user/auth', data)
        .success(function (data, status, headers, config) {
          runAuth(data.id);
        })
        .error(errorAlert);
    };

    $scope.createAdmin = function () {
      $scope.registerVals.admin = true;
      $scope.register();
    };

    $scope.register = function () {
      if ($scope.registrationForm.$invalid) {
        return;
      }

      $http.post('/api/user/register', $scope.registerVals)
        .error(void function(data, status, headers, config) {
          if (status === 0) {
            $window.alert("Server not currently reachable, try again later");
          } else if (!!data && !!data.err) {
            $window.alert(data.err);
          } else {
            $window.alert("ERROR: " + status);
          }
        })
        .success(function (data, status, headers, config) {
          runAuth(data.id);
        });
    };
  }
]);
