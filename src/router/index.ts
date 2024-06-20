import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LoginView from '@/views/LoginView.vue'
import checkAuth from './middlewares/checkAuth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/users',
    name: 'user',
    component: () => import('@/views/User/UserListing.vue'),
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/posts',
    name: 'post',
    component: () => import('@/views/Post/PostListingView.vue'),
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/posts/create',
    name: 'post.create',
    component: () => import('@/views/Post/PostCreateView.vue'),
    meta: {
      layout: DefaultLayout
    }
  },

  {
    path: '/tags',
    name: 'tag',
    component: () => import('@/views/Tag/TagListingView.vue'),
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/categories',
    name: 'category',
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

router.beforeEach(checkAuth)

export default router
