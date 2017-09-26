/*
 此文件描述了开发和构建 两种环境下的配置
 */

// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
const packageConfig = require('../package.json')

module.exports = {
  // 构建产品时使用的配置
  build: {
    // webpack的编译环境
    uatEnv: require('./uat.env'),
    proEnv: require('./pro.env'),
    // 编译输出的index.html文件 必须是本地文件系统上的绝对路径
    index: path.resolve(__dirname, '../' + packageConfig.name + '/index.html'),
    // webpack输出的目标文件夹路径
    // 指向包含应用程序的所有静态资产的根目录
    // 必须是本地文件系统上的绝对路径
    assetsRoot: path.resolve(__dirname, '../' + packageConfig.name),
    // webpack编译输出的二级文件夹 存放webpack编译处理过的资源文件
    assetsSubDirectory: 'assets',
    // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',
    staticPath: '', // 生产环境 staticPath:''
    // 使用文件映射SourceMap 以便调试
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 默认不打开gzip模式
    productionGzip: false,
    // gzip模式下需要压缩的文件的扩展名
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // 开发环境使用的配置
  dev: {
    // webpack的编译环境
    env: require('./dev.env'),
    // dev-server监听的端口
    port: process.env.DEV_PORT || 8088,
    // 启动dev-server之后自动打开浏览器
    autoOpenBrowser: true,
    // webpack编译输出的二级文件夹
    assetsSubDirectory: 'assets',
    // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',
    staticPath: '/static/',
    // 请求代理表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'/api/xxx'代理到'www.example.com/api/xxx'
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    // 是否开启 cssSourceMap
    cssSourceMap: true
  }
}
