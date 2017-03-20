const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.(js|jsx)$/,
      loader: 'babel',
    },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass'),
      }],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
    port: NODE_ENV=='production'? 8000: 8080,
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      mangle: false,
      sourcemap: false,
      minimize: true,
      mangle: { except: ['$super', '$', 'exports', 'require', '$q', '$ocLazyLoad'] },
    }),
    new ExtractTextPlugin('src/public/stylesheets/app.css', {
      allChunks: true,
    }),
  ],
};

module.exports = config;
