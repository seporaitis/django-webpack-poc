var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');


module.exports = [
  {
    context: __dirname,

    mode: 'development',

    entry: {
      index: './src/index.js',
      dashboard: './src/dashboard.js',
    },

    output: {
      path: path.resolve('../static/'),
      filename: "[name].js",
    },

    plugins: [
      new BundleTracker({filename: 'webpack-stats.json'}),
    ],

    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader'},
      ],
    },

    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx'],
    },
  },
]
