module.exports = function (config) {
  config.set({
    basePath: '../../',

    frameworks: ['mocha', 'chai', 'chai-as-promised', 'sinon-chai'],

    files: [
      'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular-mocks.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.9.0/ui-bootstrap-tpls.js',
      'public/js/*.js',
      'public/js/**/*.js',
      'test/client/**/*.js',
      'test/client/*.js'
    ],

    exclude: [
      'public/js/static.js',
      'test/client/e2e/*.js'
    ],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    captureTimeout: 10000,

    singleRun: true,

    reportSlowerThan: 500,

    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-chai',
      'karma-chai-plugins'
    ]
  });
};