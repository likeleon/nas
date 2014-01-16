"use strict";

describe('Files controller', function() {
    beforeEach(function() {
        module("nas");
        module("socketMockServices");
    });

    describe('FilesCtrl', function() {
        var scope, ctrl, socket;

        beforeEach(function() {
            inject(function($rootScope, $controller, $injector) {
                scope = $rootScope.$new();
                socket = $injector.get('socket');
                ctrl = $controller("FilesCtrl", {$scope: scope, socket: socket});
            })
        });

        it ('should expose received directories and files', function() {
            var dirInfo = {
                path: 'foo/bar',
                dirs: [{ name: "fixture" }],
                files: [{ name: "a.txt", size: "100" }, { name: "b.txt", size: "200" }]
            };
            socket.emit("dirInfo", dirInfo);

            scope.path.should.equal(dirInfo.path);
            scope.dirs.should.equal(dirInfo.dirs);
            scope.files.should.equal(dirInfo.files);
            scope.fileNodes.should.eql(_.union(scope.dirs, scope.files));
        });
    })
});