// Karma configuration
// Generated on Fri Jan 26 2018 10:45:21 GMT+0800 (CST)
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      './test/unit/index.js'
    ],

    exclude: [],

    preprocessors: {
      // 'src/lib/*.js': ['coverage'],
      './test/unit/index.js': ['webpack'],
    },
    // webpack: {
    //   module: {
    //     loaders: [{
    //       test: /\.js$/,
    //       loader: 'babel-loader',
    //       exclude: /node_modules/,
    //     },
    //       {
    //         test: /\.ts?$/,
    //         loader: 'ts-loader',
    //         exclude: /node_modules/,
    //       }],
    //   },
    // },
    webpack: {module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
              appendTsSuffixTo: [/\.vue$/],
            }
          },
          {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader'
            ],
          },
          {
            test: /\.scss$/,
            use: [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
          },
          {
            test: /\.sass$/,
            use: [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ],
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              loaders: {
                // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                // the "scss" and "sass" values for the lang attribute to the right configs here.
                // other preprocessors should work out of the box, no loader config like this necessary.
                'scss': [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
                ],
                'sass': [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader?indentedSyntax'
                ]
              }
              // other vue-loader options go here
            }
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpg|gif|svg|jpeg)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              useRelativePath: true,
            }
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          __WEEX__: false,
          'process.env': {
            NODE_ENV: '"development"',
            TRANSITION_DURATION: process.env.CI ? 100 : 50,
            TRANSITION_BUFFER: 10
          }
        })
      ],
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
      },},

    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity,
    plugin: ['karma-webpack', 'karma-coverage'],
  });
};
