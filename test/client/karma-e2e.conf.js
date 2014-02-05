module.exports = function (config) {
  config.set({
    basePath: '../../',

    frameworks: ['ng-scenario'],

    files: [
      'public/js/*.js',
      'public/js/**/*.js',
      'test/client/e2e/*.js'
    ],

    autoWatch: false,

    browsers: ['Chrome'],

    singleRun: true,

    urlRoot: '/nas_e2e/',

    proxies: {
      '/': 'http://localhost:3000'
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-ng-scenario'
    ]
  });
};