/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');
var path = require('path');

module.exports = {

  output: {
    filename: 'main.js',
    publicPath: '/assets/'
  },

  cache: true,
  debug: true,
  devtool: false,
  entry: [
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src/app.js')
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js'],
    alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/',
      'openbio-hrv$': process.cwd() + '/src',
    }
  },
  module: {
    loaders: [
    { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel-loader'
      }, {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.(png|jpg|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      }, {
        test: /\.ttf$/,
        loader: "file-loader"
      },
      {
        test: /\.eot$/,
        loader: "file-loader"
      },
      {
        test: /\.svg$/,
        loader: "file-loader"
      },
      // {
      //     test: require.resolve("jStat"),
      //     loader: "imports?this=>window!exports?jStat"
      // },
      // {
      //     test: require.resolve("histogramjs"),
      //     loader: "imports?this=>window"
      // }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};