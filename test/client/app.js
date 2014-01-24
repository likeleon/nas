"use strict";

describe('nas module', function() {
    beforeEach(function() {
        module("nas");
    });

    describe('$rootScope', function() {
        it('should expose $state and $stateParams', function() {
            inject(function($rootScope) {
                $rootScope.should.have.property('$state');
                $rootScope.should.have.property('$stateParams');
            });
        });
    })
});