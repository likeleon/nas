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

        it ('should expose received files', function() {
            var files = [{ name: "a.txt", size: "100" }, { name: "b.txt", size: "200" }];
            socket.emit("files", files);
            scope.files.should.equal(files);
        });
    })
});