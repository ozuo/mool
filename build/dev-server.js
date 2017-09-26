/*
 此文件主要完成下面几件事情：
 1、检查node和npm的版本
 2、引入相关插件和配置
 3、创建express服务器和webpack编译器
 4、配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
 5、挂载代理服务和中间件
 6、配置静态资源
 7、启动服务器监听特定端口（8080）
 8、自动打开浏览器并打开特定网址（localhost:8080）
 */

require('./check-versions')() // 检查 Node 和 npm 版本
const config = require('../config') // 获取配置

// 如果Node的环境变量中没有设置当前的环境（NODE_ENV），则使用config中的配置作为当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// 一个可以调用默认软件打开网址、图片、文件等内容的插件
// 这里用它来调用默认浏览器打开dev-server监听的端口，例如：localhost:8080
const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')

// 一个express中间件，用于将http请求代理到其他服务器
// 例：localhost:8080/api/xxx  -->  localhost:3000/api/xxx
// 这里使用该插件可以将前端开发中涉及到的请求代理到API服务器上，方便与服务器对接
const proxyMiddleware = require('http-proxy-middleware')

// 根据 Node 环境来引入相应的 webpack 配置
// const webpackConfig = process.env.NODE_ENV === 'testing' ? require('./webpack.prod.conf') : require('./webpack.dev.conf')
const webpackConfig = require('./webpack.dev.conf')

// dev-server 监听的端口，默认为config.dev.port设置的端口
const port = process.env.PORT || config.dev.port
// 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend  定义 HTTP 代理表，代理到 API 服务器
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

// 创建1个 express 实例
const app = express()

let appData = require('../data.json')
let seller = appData.seller
let goods = appData.goods
let ratings = appData.ratings

let apiRoutes = express.Router()

apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})

apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

app.use('/api', apiRoutes)

// 根据webpack配置文件创建Compiler对象
const compiler = webpack(webpackConfig)

// webpack-dev-middleware使用compiler对象来对相应的文件进行编译和绑定
// 编译绑定后将得到的产物存放在内存中而没有写进磁盘
// 将这个中间件交给express使用之后即可访问这些编译后的产品文件
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
  // quiet: true
})

// webpack-hot-middleware，用于实现热重载功能的中间件
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// 当html-webpack-plugin提交之后通过热重载中间件发布重载动作使得页面重载
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// 将 proxyTable 中的代理请求配置挂在到express服务器上
// proxy api requests
Object.keys(proxyTable).forEach(context => {
  let options = proxyTable[context]
  // 格式化options，例如将'www.example.com'变成{ target: 'www.example.com' }
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 重定向不存在的URL，常用于SPA
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// 使用webpack开发中间件 即将webpack编译后输出到内存中的文件资源挂到express服务器上
// serve webpack bundle output
app.use(devMiddleware)

// 将热重载中间件挂在到express服务器上
// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
// 静态资源的路径
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 将静态资源挂到express服务器上
app.use(staticPath, express.static('./assets'))

const uri = 'http://localhost:' + port

console.log('> Starting dev server...')
// webpack开发中间件合法（valid）之后输出提示语到控制台，表明服务器已启动
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
})

// 启动express服务器并监听相应的端口（8080）
module.exports = app.listen(port, err => {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  // 如果符合自动打开浏览器的条件，则通过opn插件调用系统默认浏览器打开对应的地址uri
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
