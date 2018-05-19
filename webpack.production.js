const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
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
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          sourceMap: true,
          minimize: true
        }
      }
    ]
  },
  mode: 'production'
})