import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Home = import('@/pages/Home')
const About = import('@/pages/About')
const Games = import('@/pages/Games')
const Lost = import ('@/pages/Lost')

const User = import('@/pages/User')
const UserLogin = import('@/components/User/UserLogin')
const UserRegister = import('@/components/User/UserRegister')

const requireAuthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (!store.getters['auth/isAuthenticated']) {
        next('/user/login')
      } else {
        next()
      }
    })
}

const requireUnauthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (store.getters['auth/isAuthenticated']) {
        next('/home')
      } else {
        next()
      }
    })
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    name: 'Home',
    path: '/home',
    component: () => Home,
  }, {
    name: 'About',
    path: '/about',
    component: () => About,
    beforeEnter: requireAuthenticated
  }, {
    name: 'Games',
    path: '/games',
    component: () => Games,
    beforeEnter: requireAuthenticated
  }, {
    name: 'Files',
    path: '/files',
    component: () => Files,
    beforeEnter: requireAuthenticated
  } ,{
    name: 'User',
    path: '/user',
    component: () => User,
    children: [
      {
        name: 'UserLogin',
        path: 'login',
        component: () => UserLogin,
        beforeEnter: requireUnauthenticated
      }, {
        name: 'UserRegister',
        path: 'register',
        component: () => UserRegister
      }, {
        name: 'RegisterVerify',
        path: 'register/:key'
      }
    ]
  }, {
    name: 'Lost',
    path: '*',
    component: () => Lost
  }
]

const router = new Router({
  routes,
  mode: 'history',
  saveScrollPosition: true,
  base: process.env.BASE_URL,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].name
  next()
})

export default router
