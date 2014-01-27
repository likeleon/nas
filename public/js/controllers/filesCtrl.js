"use strict";

nas.controller("FilesCtrl", ['$scope', 'filesService',
    function ($scope, filesService) {
        filesService.onFiles(function(files) {
            $scope.path = files.path;
            $scope.dirs = files.dirs;
            $scope.files = files.files;
            $scope.fileNodes = _.union($scope.dirs, $scope.files);

            $scope.pathParts = [{name: 'home', path: ''}];
            var partPath = '';
            _.forEach($scope.path.split('/'), function(name) {
                partPath += partPath ? '/' + name : name;
                $scope.pathParts.push({
                    name: name,
                    path: partPath
                });
            });
        });

        $scope.nodeClicked = function(node) {
            if (node.type === 'directory') {
                $scope.$state.go($scope.$state.current.name, {
                    path: $scope.path ? $scope.path + '/' + node.name : node.name
                });
            }
        };

        $scope.momentFromNow = function(date) {
            return moment(date).fromNow();
        };
    }
]);