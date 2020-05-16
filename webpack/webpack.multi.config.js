const common = require('./config');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  ...common,
  // mode: 'production',
  entry: {
    index: './src/index.js',
    multi: './src/multi.js',
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    // __dirname， 表示当前文件所在的目录：即webpack目录
    // 这里resolve获取到的就是和webpack 平级的dist 目录 
    path: path.resolve(__dirname, '../dist')
  },
  // 公共js单独打包
  optimization: {
    splitChunks: {
      // 采用默认设置：async，就会导致没法分包，因为demo代码没有异步加载或者按需加载
      chunks: 'all',
      name: true,
      // 项目中js-cookie + moment，代码总和在157kb，如果minSize设置为200kb，则最后不会单独打成async.bundle.js: 
      minSize: 30000, // 符合分割条件的代码大小必需在多大之后，才会被单独分包；
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'async', // 如果没有name存在, 则以对象属性名'vendors'为准
          minChunks: 1, // 最少在多少个入口被引用
          priority: -20, // 优先级，这里暂时体现不出来
        },
      }
    }
  }
};