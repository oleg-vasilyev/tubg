const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.tsx'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
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
        test: /\.(jpg|png|gif|svg|woff)/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
<<<<<<< HEAD
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  }
=======
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          failOnHint: true,
          typeCheck: true,
        }
      }
    ]
  },
>>>>>>> a07b22a59fa5a2d11ae6ed48546ed6ea5cd7b3c2
};