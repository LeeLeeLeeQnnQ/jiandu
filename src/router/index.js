import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { getToken } from '@/js/util'


import login from '@/pages/login/login.vue'
import home from '@/pages/home/home.vue'
import check from '@/pages/check/check.vue'
import checkItem from '@/pages/checkItem/checkItem.vue'
import viewList from '@/pages/viewList/viewList.vue'
import viewItem from '@/pages/viewItem/viewItem.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/check',
      name: 'check',
      component: check
    },
    {
      path: '/checkItem',
      name: 'checkItem',
      component: checkItem
    },
    {
      path: '/viewList',
      name: 'viewList',
      component: viewList
    },
    {
      path: '/viewItem',
      name: 'viewItem',
      component: viewItem
    },
  ],
  mode: 'history'
})

const LOGIN_PAGE_NAME = 'login'


router.beforeEach((to, from, next) => {
  // next();
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    next()
  } else{
    // 已登录且要跳转的页面是登录页
    if (store.state.info.hasGetInfo) {
      next()
    } else {
      store.dispatch('setUserInfo').then(res => {
        if (res.code != 0) {
          next({
            name: LOGIN_PAGE_NAME // 跳转到登录页
          })
          return
        }
        next()
      })
    }
  }
})



export default router