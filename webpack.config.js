/* eslint-disable @typescript-eslint/no-var-requires */

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');

const { resolve } = require('path');

const { description, version } = require('./package.json');
const title = 'Phaser 3 Project Starter';
const viewport = 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const srcPath = resolve(__dirname, 'src');
const dstPath = resolve(__dirname, 'dist');

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'hidden-source-map' : 'source-map',
  entry: {
    index: `${srcPath}/index.ts`
  },
  output: {
    filename: '[name].js',
    chunkFilename: 'js/[name].[contenthash].js',
    path: dstPath
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin({})]
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: ['ts-loader', 'source-map-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    isProd ? new CleanWebpackPlugin() : null,
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      },
      // App build-time configurables.
      GAME_TITLE: JSON.stringify(title),
      GAME_VERSION: JSON.stringify(version),
      // Phaser build flags.
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
      'typeof EXPERIMENTAL': JSON.stringify(false),
      'typeof PLUGIN_3D': JSON.stringify(false),
      'typeof PLUGIN_CAMERA3D': JSON.stringify(false),
      'typeof PLUGIN_FBINSTANT': JSON.stringify(false),
      'typeof FEATURE_SOUND': JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      title,
      template: `!!ejs-loader?{"esModule":false}!${srcPath}/index.html`,
      filename: 'index.html',
      inject: 'body',
      minify: {
        minifyCSS: true,
        minifyJS: true
      },
      meta: {
        viewport,
        description,
        version
      }
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: `${srcPath}/assets`, to: 'assets' }]
    })
  ].filter(Boolean),
  devServer: {
    static: {
      directory: srcPath,
      publicPath: '/'
    },
    host: 'localhost',
    port: 4200,
    compress: true,
    hot: false
  }
};
