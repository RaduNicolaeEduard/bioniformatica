import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/L1',
    name: 'L1',

    component: () => import('../views/L1.vue')
  },
  {
    path: '/L2',
    name: 'L2',

    component: () => import('../views/L2.vue')
  },
  {
    path: '/L3',
    name: 'L3',

    component: () => import('../views/L3.vue')
  },
  {
    path: '/L4',
    name: 'L4',

    component: () => import('../views/L4.vue')
  },
  {
    path: '/L5',
    name: 'L5',

    component: () => import('../views/L5.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
