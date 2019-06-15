import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import { routes as intro } from '@/app/intro'
import { routes as user } from '@/app/user'
import { routes as overview } from '@/app/overview'
import { routes as newplant } from '@/app/new-plant'
import { routes as plant } from '@/app/plant'
import { routes as gallery } from '@/app/gallery'
import { routes as settings } from '@/app/settings'
import { routes as notfound } from '@/app/not-found'

import { hasUser } from '@/app/user/utils/user'

Vue.use(Router)
Vue.use(Meta, { keyName: 'meta' })

const router = new Router({
  mode: 'history',

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },

  routes: [
    ...intro,
    ...user,
    ...overview,
    ...newplant,
    ...plant,
    ...gallery,
    ...settings,
    ...notfound
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && await hasUser() === false) {
    next('intro')
  } else {
    next()
  }
})

export default router