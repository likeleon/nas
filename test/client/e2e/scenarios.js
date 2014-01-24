"use strict";

describe('nas e2e', function() {
    it('should redirect / to #/files', function() {
        browser().navigateTo('/');
        expect(browser().location().url()).toBe("/files");
    });
});