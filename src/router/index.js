import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mwt-home-view',
    component: () => import(/* webpackChunkName: "about" */ '../views/mwt-home-view')
  },
  {
    path: '/refund',
    name: 'mwt-refund-view',
    component: () => import(/* webpackChunkName: "about" */ '../views/mwt-refund-view')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
