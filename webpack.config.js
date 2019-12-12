/**
 * Webpack configuration
 * @copyright Khaydarov Murod
 */
'use strict';

module.exports = (env, argv) => {
  const path = require('path');
  const TerserPlugin = require('terser-webpack-plugin');

  /**
   * Plugins for bundle
   * @type {webpack}
   */
  const webpack = require('webpack');

  return {
    entry: {
      'crypto': './src/index.ts',
      'playground': './src/playground.ts'
    },

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
      library: [ 'App', '[name]' ],
      libraryExport: 'default',
      libraryTarget: 'umd'
    },

    watchOptions: {
      aggregateTimeout: 50
    },

    /**
     * Tell webpack what directories should be searched when resolving modules.
     */
    resolve: {
      modules: [path.join(__dirname, 'src'),  'node_modules'],
      extensions: ['.js', '.ts']
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              }
            },
            {
              loader: 'ts-loader'
            },
            {
              loader: 'tslint-loader',
              options: {
                fix: true
              }
            }
          ]
        },
        // {
        //   test: /\.css$/,
        //   exclude: /node_modules/,
        //   use: [
        //     'postcss-loader'
        //   ]
        // },
        // {
        //   test: /\.(svg)$/,
        //   use: [
        //     {
        //       loader: 'raw-loader',
        //     }
        //   ]
        // }
      ]
    },

    devtool: 'source-map',

    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true
        })
      ]
    }
  };
};
