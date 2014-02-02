"use strict";

describe('Files controller', function () {
    beforeEach(function () {
        module("nas");
        module("filesMockServices");
    });

    describe('FilesCtrl', function () {
        var scope, ctrl, $httpBackend, filesService, files, $window;

        beforeEach(function () {
            inject(function ($rootScope, $controller, $injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.whenGET('partials/files.html').respond({});

                scope = $rootScope.$new();
                filesService = $injector.get('filesService');
                $window = {
                    location: { href: '' }
                };
                ctrl = $controller("FilesCtrl", {$scope: scope, $window: $window, filesService: filesService});

                files = {
                    path: 'foo/bar',
                    dirs: [{ type: "directory", name: "fixture" }],
                    files: [{ type: "file", name: "a.txt", size: "100" }, { type: "file", name: "b.txt", size: "200" }]
                };
                filesService.emitFiles(files);
            })
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it ('should expose received directories and files', function () {
            scope.path.should.equal(files.path);
            scope.dirs.should.equal(files.dirs);
            scope.files.should.equal(files.files);
            scope.fileNodes.should.eql(_.union(scope.dirs, scope.files));
            scope.pathParts.should.eql([
                { name: 'home', path: '' },
                { name: 'foo', path: 'foo' },
                { name: 'bar', path: 'foo/bar' }]);
            $httpBackend.flush();
        });

        describe('downloadFile()', function () {
            it('should download file', function () {
                $window.location.href.should.equal('');
                scope.downloadFile(files.files[0]);
                $window.location.href.should.equal('/download/foo/bar/a.txt');
                $httpBackend.flush();
            })
        });
    })
});