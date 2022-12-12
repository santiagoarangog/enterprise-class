import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import defaultVue from '@/layouts/default.vue'
import routesConfig from './routesConfig'

let routes = [
  routesConfig.Index,
  routesConfig.Client,
  routesConfig.Login,
  routesConfig.MyAccount,
  routesConfig.Summary,
  routesConfig.AccountVerified,
  routesConfig.ExpiredLink,
  routesConfig.ResetPassword,
  routesConfig.PasswordChange,
  routesConfig.MyOffers,
  routesConfig.MyCurriculum,
  routesConfig.CreateOffer,
] as RouteRecordRaw[]

routes = routes.map((route: RouteRecordRaw) => {
  if (!route.meta?.layout) {
    route.meta = Object.assign({}, route.meta, {
      layout: defaultVue,
    })
  }
  return route
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const { auth } = to.meta
  const isAuth = localStorage.getItem('vincu-token')
  if (auth && !isAuth) {
    next(routesConfig.Login)
    return
  }

  next()
})

export default router
