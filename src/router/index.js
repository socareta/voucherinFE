import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home.vue'
import Dashboard from '../views/Home2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Home2',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/Users.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/Profile.vue')
  },
  {
    path: '/property',
    name: 'Property',
    component: () => import('../views/property/Properties.vue')
  },
  {
    path: '/voucher',
    name: 'Voucher',
    component: () => import('../views/voucher/Dashboard.vue')
  },
  {
    path: '/voucher-list',
    name: 'VoucherList',
    component: () => import('../views/voucher/VoucherList.vue')
  },
  {
    path: '/voucher-list/:id',
    name: 'VoucherListParam',
    component: () => import('../views/voucher/VoucherList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.isLoggedIn && store.getters.user) {
      next()
      return
    }
    next('/login')
  }

  if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next('/profile')
  }

  next()
})
export default router
