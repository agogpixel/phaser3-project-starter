/* eslint-disable @typescript-eslint/no-var-requires */

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');

const { resolve } = require('path');

const { description, version } = require('./package.json');
const title = 'Phaser 3 Project Starter';
const viewport = 'user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0';

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
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: ['ts-loader', 'source-map-loader'],
        include: srcPath,
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: isProd
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          isProd ? { loader: MiniCssExtractPlugin.loader } : { loader: 'style-loader' },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    isProd ? new CleanWebpackPlugin() : null,
    isProd ? new MiniCssExtractPlugin() : undefined,
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
        minifyCSS: isProd,
        minifyJS: isProd,
        collapseWhitespace: isProd,
        keepClosingSlash: !isProd,
        removeComments: isProd,
        removeRedundantAttributes: isProd,
        removeScriptTypeAttributes: isProd,
        removeStyleLinkTypeAttributes: isProd,
        useShortDoctype: isProd
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
