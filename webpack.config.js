var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: './src/assets/js/index.js',
  output: {
    path: __dirname + "/public/assets/js/",
    filename: 'main.min.js'
  },
  plugins: debug ? [
    new BrowserSyncPlugin({
      proxy: 'http://webpack.dev/',
      files: ['src/**/*', 'public/**/*'],
      notify: false
    })
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false, mangle: false, compress: { warnings: false }})
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: debug ? 'babel-loader' : 'strip?strip[]=console.log!babel-loader?cacheDirectory'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
