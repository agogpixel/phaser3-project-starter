/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: './src/index.ts'
  },
  devtool: isProd ? 'hidden-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: ['ts-loader', 'source-map-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin({})]
  },
  plugins: [
    isProd ? new CleanWebpackPlugin() : null,
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      },
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
      'typeof EXPERIMENTAL': JSON.stringify(false),
      'typeof PLUGIN_3D': JSON.stringify(false),
      'typeof PLUGIN_CAMERA3D': JSON.stringify(false),
      'typeof PLUGIN_FBINSTANT': JSON.stringify(false),
      'typeof FEATURE_SOUND': JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      title: 'Phaser 3 Project Starter',
      template: '!!ejs-loader?{"esModule":false}!' + path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      },
      meta: {
        viewport: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
      }
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/assets', to: 'assets' }]
    })
  ].filter(Boolean),
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'src'),
      publicPath: '/'
    },
    host: 'localhost',
    port: 4200,
    compress: true,
    hot: false
  }
};
