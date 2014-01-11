"use strict";

nas.controller("FilesCtrl", ['$scope', 'socket',
    function ($scope, socket) {
        socket.on('files', function(files) {
            $scope.files = files;
        });
    }
]);