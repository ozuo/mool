import Vue from 'vue'
import VueRouter from 'vue-router'
import packageConfig from 'package'

const Goods = resolve => require(['components/goods/goods'], resolve)
const Ratings = resolve => require(['components/goods/goods'], resolve)
const Seller = resolve => require(['components/goods/goods'], resolve)

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  base: '/' + packageConfig.name,
  linkActiveClass: 'active',
  routes: [
    {path: '/', redirect: '/goods'},
    {path: '/goods', component: Goods},
    {path: '/ratings', component: Ratings},
    {path: '/seller', component: Seller},
    {path: '*', redirect: '/goods', hidden: true} // “*” 匿名路由须放在最后
  ]
})
