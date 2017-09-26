'use strict'
/*
 此文件主要完成下面几件事情：
 1、配置css加载器
 2、编译css之后自动添加前缀
 */

const utils = require('./utils')
const config = require('../config')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // css加载器
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  // 编译css之后自动添加前缀
  postcss: [
    require('autoprefixer')({
      // 意思是只对主流浏览器的最新3个版本（现代最新的浏览器基本都不需要兼容了）
      browsers: ['last 3 versions']
    })
  ]
}
