const webpack = require('webpack');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    clientLogLevel: 'none',
    overlay: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          sourceMap: true,
        }
      }
    ]
  },
  mode: 'development'
})