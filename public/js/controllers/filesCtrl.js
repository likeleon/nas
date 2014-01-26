"use strict";

nas.controller("FilesCtrl", ['$scope', 'filesService',
    function ($scope, filesService) {
        filesService.onFiles(function(files) {
            $scope.path = files.path;
            $scope.dirs = files.dirs;
            $scope.files = files.files;
        });

        $scope.fileNodes = function() {
            return _.union($scope.dirs, $scope.files);
        };

        $scope.nodeClicked = function(node) {
            if (node.type === 'directory') {
                $scope.$state.go($scope.$state.current.name, {
                    path: $scope.path ? $scope.path + '/' + node.name : node.name
                });
            }
        };
    }
]);