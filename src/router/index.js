import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterService from '../services/RouterService'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: RouterService.getRoutes()
})

export default router
