var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = (env) => {
  if (env == undefined) {
    env = {production: false};
  }
  return [
    {
      context: __dirname,

      mode: (env.production ? 'production' : 'development'),

      devtool: (env.production ? '(none)' : 'inline-source-map'),

      entry: {
        index: './src/index.js',
        dashboard: './src/dashboard.js',
      },

      output: {
        path: path.resolve('../django_webpack_poc/homepage/static/'),
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
    {
      context: __dirname,

      mode: (env.production ? 'production' : 'development'),

      devtool: (env.production ? '(none)' : 'inline-source-map'),

      entry: {
        base: './src/base.scss',
        'font-awesome': './node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss',
        'fa-solid': './node_modules/@fortawesome/fontawesome-free/scss/solid.scss',
      },

      output: {
        path: path.resolve('../django_webpack_poc/homepage/static/'),
        filename: '[name].css',
      },

      plugins: [
        new ExtractTextPlugin('[name].min.css')
      ],

      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
          {
            test: /\.(scss)$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {loader: 'css-loader'},
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: function() {
                      return [
                        require('autoprefixer'),
                        require('precss'),
                        require('cssnano'),
                      ];
                    },
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    implementation: require('sass'),
                  },
                },
              ],
            }),
          },
          {
            test: /font-awesome\.config\.js/,
            use: [
              {loader: 'style-loader'},
              {loader: 'font-awesome-loader'},
            ],
          },
          {
            test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'url-loader?limit=10000',
          },
          {
            test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/',
                  publicPath: '',
                },
              },
            ],
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              'file-loader?name=images/[name].[ext]',
              'image-webpack-loader?bypassOnDebug',
            ],
          },
        ],
      },
    },
  ];
};
