import Vue from 'vue'
import VueRouter from 'vue-router'
import packageConfig from 'package'

const ComponentGoods = resolve => require(['../components/goods/goods'], resolve)
const ComponentRatings = resolve => require(['../components/ratings/ratings'], resolve)
const ComponentSeller = resolve => require(['../components/seller/seller'], resolve)

const ViewSearch = resolve => require(['../view/search/index'], resolve)
const ViewSeller = resolve => require(['../view/seller/index'], resolve)

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  base: '/' + packageConfig.name,
  linkActiveClass: 'active',
  routes: [
    {path: '/', redirect: '/search'},
    {
      path: '/search',
      component: ViewSearch
    },
    {
      path: '/seller',
      component: ViewSeller,
      children: [
        {path: 'goods', component: ComponentGoods},
        {path: 'ratings', component: ComponentRatings},
        {path: 'info', component: ComponentSeller}
      ]
    },
    {path: '*', redirect: '/search'} // “*” 匿名路由须放在最后
  ]
})
