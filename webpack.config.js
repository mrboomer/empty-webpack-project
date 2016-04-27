var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
    new ExtractTextPlugin("../css/main.min.css", {
      allChunks: true
    }),
    new BrowserSyncPlugin({
      proxy: 'http://webpack.dev/',
      files: ['src/**/*'],
      notify: false
    })
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false, mangle: false, compress: { warnings: false }})
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: __dirname + '/src/assets/js/'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: debug ? 'babel-loader' : 'strip?strip[]=console.log!babel-loader?cacheDirectory'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test: /\.(html|php)$/,
        loader: "file?name=../../[name].[ext]"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss', 'html', 'php']
  }
};
