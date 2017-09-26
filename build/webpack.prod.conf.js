/*
 此文件主要完成下面几件事情：
 1、合并基础的webpack配置
 2、使用styleLoaders
 3、配置webpack的输出
 4、配置webpack插件
 5、gzip模式下的webpack插件配置
 6、webpack-bundle分析
 */

const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 用于从webpack生成的bundle中提取文本到特定文件中的插件
// 可以抽取出css，js文件将其与webpack输出的bundle分离
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const env = process.env.NODE_ENV === 'production' ? config.build.proEnv : config.build.uatEnv
// 测试环境启用SourceMap
const sourceMap = process.env.NODE_ENV === 'production' ? config.build.productionSourceMap : true

const packageConfig = require('../package.json')

function resolveApp (relativePath) {
  return path.resolve(relativePath)
}

// 合并基础的webpack配置
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: sourceMap,
      extract: true
    })
  },
  devtool: sourceMap ? '#source-map' : false,
  // 配置webpack的输出
  output: {
    // 编译输出目录
    path: config.build.assetsRoot,
    publicPath: '/' + packageConfig.name + '/',
    // 编译输出文件名格式
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 没有指定输出名的文件输出的文件名格式
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  // 配置webpack插件
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // 丑化压缩代码
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
        // drop_debugger: true,
        // drop_console: true
      },
      sourceMap: true
    }),
    // 抽离css文件
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: packageConfig.sysname,
      // 生成网页的HTML名字，可以使用/来控制文件文件的目录结构，最终生成的路径是基于webpack配置的output.path的
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      // 源文件，路径相对于本文件所在的位置
      template: 'index.html',
      // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
      // 让打包生成的html文件中css和js就默认添加到html里面，css就添加到head里面，js就添加到body里面
      inject: true,
      // favicon: resolveApp('src/assets/img/logo.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      path: config.build.staticPath,
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    // 如果文件是多入口的文件，可能存在，重复代码，把公共代码提取出来，也不会重复下载公共代码
    // （多个页面间会共享此文件的缓存）
    new webpack.optimize.CommonsChunkPlugin({
      // 公共代码chunk唯一的标识
      name: 'vendor',
      // 公共代码的判断标准：某个js模块被多少个chunk加载了才算是公共代码
      minChunks (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

// gzip模式下需要引入compression插件进行压缩
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

// webpack-bundle分析
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerPort: 8888
  }))
}
module.exports = webpackConfig
