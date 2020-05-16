const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development', // development
  // 支持cheap-eval-source-map、eval-source-map、source-map,cheap-module-eval-source-map、inline-cheap-module-source-map,...
  devtool: 'none',
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      use: ['babel-loader'],
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }],
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }, {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }, {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
    }]
  },
  plugins: [
    // new BundleAnalyzerPlugin(), 打包图形分析
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /zh-cn/,
    ),
    new webpack.DefinePlugin({
      'process.env': { DEPLOY_ENV: '\"' +'prod' + '\"' }
    }),
    new HtmlWebpackPlugin({
      template: './index.ejs'
    }),
    new MiniCssExtractPlugin({
      filename: 'index.[contenthash:8].css' //文件目录会放入output.path里
    }),
  ],
}