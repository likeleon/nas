"use strict";

describe('Files controller', function() {
    beforeEach(function() {
        module("nas");
        module("socketMockServices");
    });

    describe('FilesCtrl', function() {
        var scope, ctrl, socket;

        beforeEach(function() {
            inject(function($rootScope, $controller, $httpBackend, $injector) {
                scope = $rootScope.$new();
                socket = $injector.get('socket');
                ctrl = $controller("FilesCtrl", {$scope: scope, socket: socket});

                $httpBackend.whenGET('partials/files.html').respond({});
            })
        });

        it ('should expose received directories and files', function() {
            var files = {
                path: 'foo/bar',
                dirs: [{ name: "fixture" }],
                files: [{ name: "a.txt", size: "100" }, { name: "b.txt", size: "200" }]
            };
            socket.emit("files", files);

            scope.path.should.equal(files.path);
            scope.dirs.should.equal(files.dirs);
            scope.files.should.equal(files.files);
            scope.fileNodes().should.eql(_.union(scope.dirs, scope.files));
        });

        describe('nodeClicked()', function() {
            it ('with dirNode should changes directory', function() {
                var receivedDir = null;

                socket.on('change directory', function(dir) {
                    receivedDir = dir;
                }, function(dir){
                    return { path: dir, dirs: [], files: [] };
                });

                scope.path = 'foo/bar';
                scope.nodeClicked({
                    type: 'directory',
                    name: 'dir_1'
                });
                receivedDir.should.equal('foo/bar/dir_1');
            });

            it ('with fileNode has no effect', function() {
                scope.nodeClicked({
                    type: 'file',
                    name: 'file_1'
                });
            });
        });
    })
});