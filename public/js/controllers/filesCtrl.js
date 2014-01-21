"use strict";

nas.controller("FilesCtrl", ['$scope', 'socket',
    function ($scope, socket) {
        socket.on('files', function(files) {
            _updateFiles(files);
        });

        $scope.fileNodes = function() {
            return _.union($scope.dirs, $scope.files);
        };

        $scope.nodeClicked = function(node) {
            if (node.type === 'directory') {
                var dir = $scope.path + '/' + node.name;
                socket.emit('change directory', dir, function(files) {
                    _updateFiles(files);
                });
            }
        };

        var _updateFiles = function(files) {
            $scope.path = files.path;
            $scope.dirs = files.dirs;
            $scope.files = files.files;
        }
    }
]);