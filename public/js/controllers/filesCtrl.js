"use strict";

nas.controller("FilesCtrl", ['$scope', 'socket',
    function ($scope, socket) {
        socket.on('dirInfo', function(dirInfo) {
            $scope.path = dirInfo.path;
            $scope.dirs = dirInfo.dirs;
            $scope.files = dirInfo.files;
        });

        $scope.fileNodes = function() {
            return _.union($scope.dirs, $scope.files);
        };
    }
]);