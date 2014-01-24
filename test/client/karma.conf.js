module.exports = function(config) {
    config.set({
        basePath: '../../',

        frameworks: ['mocha'],

        files: [
            'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular-mocks.js',
            'public/js/*.js',
            'public/js/**/*.js',
            'test/client/**/*.js',
            'test/client/*.js'
        ],

        exclude: [
            'test/client/e2e/*.js'
        ],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        captureTimeout: 5000,

        singleRun: true,

        reportSlowerThan: 500,

        plugins: [
            'karma-mocha',
            'karma-chrome-launcher'
        ]
    });
};