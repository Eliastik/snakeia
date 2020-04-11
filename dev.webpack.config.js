const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'SnakeIA.js'
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: './dist',
  }
};

module.exports = config;