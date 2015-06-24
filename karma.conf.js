'use strict';

var path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha','chai-sinon'],
    files: [
      'test/helpers/**/*.js',
      'test/spec/components/**/*.js',
    ],
    preprocessors: {
      'test/spec/components/**/*.js': ['webpack'],
    },
    webpack: {
      cache: true,
      module: {
        loaders: [
          {
            test: /\.gif/,
            loader: 'url-loader?limit=10000&mimetype=image/gif'
          }, {
            test: /\.jpg/,
            loader: 'url-loader?limit=10000&mimetype=image/jpg'
          }, {
            test: /\.png/,
            loader: 'url-loader?limit=10000&mimetype=image/png'
          }, {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader'
          }, {
            test: /\.less/,
            loader: 'style-loader!css-loader!less-loader'
          }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          }, {
            test: /\.woff/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
          }, {
            test: /\.woff2/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff2'
          },
          {
              test: require.resolve("jStat"),
              loader: "imports?this=>window!exports?jStat"
          },
          {
              test: require.resolve("histogramjs"),
              loader: "imports?this=>window"
          }
        ]
      },
      resolve: {
        alias: {
          'styles': path.join(process.cwd(), './src/styles/'),
          'components': path.join(process.cwd(), './src/components/'),
          'stores': '../../../src/stores/',
          'actions': '../../../src/actions/'
        }
      }
    },
    webpackServer: {
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // browsers: ['PhantomJS'],
    browsers: ['Chrome'],
    reporters: ['spec'],
    captureTimeout: 60000,
    singleRun: true
  });
};
