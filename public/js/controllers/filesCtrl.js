"use strict";

nas.controller("FilesCtrl", ['$scope', '$window', 'filesService',
    function ($scope, $window, filesService) {
        filesService.onFiles(function (files) {
            $scope.path = files.path;
            $scope.dirs = files.dirs;
            $scope.files = files.files;
            $scope.fileNodes = _.union($scope.dirs, $scope.files);

            $scope.pathParts = [{name: 'home', path: ''}];
            var partPath = '';
            _.forEach($scope.path.split('/'), function (name) {
                partPath += partPath ? '/' + name : name;
                $scope.pathParts.push({
                    name: name,
                    path: partPath
                });
            });
        });

        $scope.openDirectory = function (node) {
            if (node.type !== 'directory')
                return;

            $scope.$state.go($scope.$state.current.name, {
                path: $scope.path ? $scope.path + '/' + node.name : node.name
            });
        };

        $scope.downloadFile = function (node) {
            if (node.type !== 'file')
                return;

            var filePath = $scope.path ? $scope.path + '/' + node.name : node.name;
            $window.location.href = '/download/' + filePath;
        }

        $scope.momentFromNow = function (date) {
            return moment(date).fromNow();
        };
    }
]);