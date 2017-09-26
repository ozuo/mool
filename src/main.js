import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import router from './router'
import store from './vuex'
import * as filters from './filters' // 全局vue filter
import App from './App'

import './assets/style/reset.css'
import 'assets/stylus/index.styl'

import './mock/index.js' // 该项目请求使用mockjs模拟
Vue.use(VueRouter)
Vue.use(VueResource)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(() => {
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
