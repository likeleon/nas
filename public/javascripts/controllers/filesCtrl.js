"use strict";

function FilesCtrl($scope) {
    var socket = io.connect();

    socket.on('files', function(files) {
        $scope.$apply(function() {
            $scope.files = files;
        });
    });
}