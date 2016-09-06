var webpack = require('webpack');
var path = require('path');

var __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: [
    './src/index.js'
  ],
  devtool: 'cheap-module-source-map',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(__DEV__ ? 'development' : 'production')
      },
      '__DEVTOOLS__': !__DEV__
    })
  ]
};
