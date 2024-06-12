import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LoginView from '@/views/LoginView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: LoginView,
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: '/',
    component: HomeView,
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/users',
    component: () => import('@/views/User/UserListing.vue'),
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/posts',
    component: () => import('@/views/Post/PostListingView.vue'),
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/tags',
    component: () => import('@/views/Tag/TagListingView.vue'),
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/categories',
    component: () => import('@/views/Category/CategoryListingView.vue'),
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
