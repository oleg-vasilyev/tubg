const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        minifyCSS: true,
        removeScriptTypeAttributes: true,
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          sourceMap: true,
          minimize: true
        }
      },
      {
        test: /\.(jpg|png|gif|svg|woff)/,
        loader: 'file-loader'
      }
    ]
  },
  mode: 'production'
})