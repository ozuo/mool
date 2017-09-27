/*
 此文件主要完成下面几件事情：
 1、配置webpack编译入口
 2、配置webpack输出路径和命名规则
 3、配置模块resolve规则
 4、配置不同类型模块的处理规则
 注：这个配置里面只配置了.js、.vue、图片、字体等几类文件的处理规则，如果需要处理其他文件可以在module.rules里面配置
 */

const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')

// 返回绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 配置webpack编译入口
  entry: {
    app: './src/main.js'
  },
  // 配置webpack输出路径和命名规则
  output: {
    // webpack输出的目标文件夹路径（例如：/dist）
    path: config.build.assetsRoot,
    // webpack输出bundle文件命名格式
    filename: '[name].js',
    // webpack编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  // 配置模块resolve的规则
  resolve: {
    // 自动解析确定的扩展名, 使导入模块时不带扩展名
    extensions: ['.js', '.vue', '.css', '.json'],
    // 创建路径别名，有了别名之后引用模块更方便，例如
    // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'package': path.resolve(__dirname, '../package.json'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'view': path.resolve(__dirname, '../src/view'),
      'style': path.resolve(__dirname, '../src/assets/style'),
      'api': path.resolve(__dirname, '../src/api'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'vuex': path.resolve(__dirname, '../src/vuex'),
      'router': path.resolve(__dirname, '../src/router'),
      'mock': path.resolve(__dirname, '../src/mock'),
      'static': path.resolve(__dirname, '../static')
    }
  },
  // 配置不同类型模块的处理规则
  module: {
    rules: [
      // 对src和test文件夹下的.js和.vue文件使用eslint-loader
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      // 对所有.vue文件使用vue-loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // 对src和test文件夹下的.js文件使用babel-loader
      // build时如果遇到 “UglifyJs Unexpected token: operator (>)” 之类的错误，除了要配置.babelrc文件外，可能还需要在下面加上resolve
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/element-ui/src'),
          resolve('node_modules/element-ui/packages/scrollbar/src'),
          resolve('node_modules/element-ui/packages/input/src')
        ]
      },
      // 对图片资源文件使用url-loader。query.name指明了输出的命名规则
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // 对字体资源文件使用url-loader。query.name指明了输出的命名规则
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      // 对影音资源文件使用 file-loader。query.name指明了输出的命名规则
      {
        test: /\.(mp3|wav|mp4|ogg)$/,
        loader: 'file-loader',
        query: {
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
