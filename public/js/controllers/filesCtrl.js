"use strict";

nas.controller("FilesCtrl", ['$scope', 'socket',
    function ($scope, socket) {
        socket.on('dirInfo', function(dirInfo) {
            $scope.path = dirInfo.path;
            $scope.files = dirInfo.files;
        });
    }
]);