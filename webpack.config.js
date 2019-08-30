const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = true;

module.exports = {
  mode: 'production',
  devtool: isProd
    ? false
    : 'source-map',
  entry: './src/sketch.js',
  target: "web",
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'snakeSketch.js',
    libraryTarget: 'commonjs2' //comment this to build for browser
  },
  plugins: [new UglifyJsPlugin({
      uglifyOptions: {
        beautify: false,
        ecma: 5,
        compress: true,
        comments: false
      }
    })],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              [
                "@babel/preset-env", {
                  "targets": {
                    "browsers": "last 2 versions, ie 10-11"
                  },
                  "modules": false
                }
              ]
            ]
          }
        },
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
};