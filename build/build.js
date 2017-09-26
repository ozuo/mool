/*
 此文件主要完成下面几件事情：
 1、loading动画
 2、删除创建目标文件夹
 3、webpack编译
 4、输出信息
 */

// 检查NodeJS和npm的版本
require('./check-versions')()

const ora = require('ora')
// 递归删除文件
// The UNIX command rm -rf for node. https://www.npmjs.com/package/rimraf
const rm = require('rimraf')
const path = require('path')
// 用于在控制台输出带颜色字体的插件
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

console.log('building for ' + process.env.NODE_ENV + '...')
const spinner = ora('building for ' + process.env.NODE_ENV + '...')
// 开启loading动画
spinner.start()

// 输出文件的目标文件夹
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // webpack编译
  webpack(webpackConfig, function (err, stats) {
    // 停止loading动画
    spinner.stop()
    if (err) throw err
    // 没有出错则输出相关信息
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    //  输出提示信息  提示用户请在 http 服务下查看本页面，否则为空白页
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
