import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: Login,
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: '/',
    component: Home,
    meta: {
      layout: DefaultLayout
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
