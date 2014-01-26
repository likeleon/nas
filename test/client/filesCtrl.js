"use strict";

describe('Files controller', function() {
    beforeEach(function() {
        module("nas");
        module("filesMockServices");
    });

    describe('FilesCtrl', function() {
        var scope, ctrl, filesService;

        beforeEach(function() {
            inject(function($rootScope, $controller, $httpBackend, $injector) {
                scope = $rootScope.$new();
                filesService = $injector.get('filesService');
                ctrl = $controller("FilesCtrl", {$scope: scope, filesService: filesService});

                $httpBackend.whenGET('partials/files.html').respond({});
            })
        });

        it ('should expose received directories and files', function() {
            var files = {
                path: 'foo/bar',
                dirs: [{ name: "fixture" }],
                files: [{ name: "a.txt", size: "100" }, { name: "b.txt", size: "200" }]
            };
            filesService.emitFiles(files);

            scope.path.should.equal(files.path);
            scope.dirs.should.equal(files.dirs);
            scope.files.should.equal(files.files);
            scope.fileNodes().should.eql(_.union(scope.dirs, scope.files));
        });

        describe('nodeClicked()', function() {
            it ('with dirNode should changes directory', function() {
                var receivedPath = null;

                filesService.onListFiles(function(path) {
                    receivedPath = path;
                });

                scope.path = 'foo/bar';
                scope.nodeClicked({
                    type: 'directory',
                    name: 'dir_1'
                });
                receivedPath.should.equal('foo/bar/dir_1');
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