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
    name: 'users',
    component: () => import('@/views/User/UserListing.vue'),
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/posts',
    name: 'posts.index',
    component: () => import('@/views/Post/PostListingView.vue'),
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/posts/create',
    name: 'posts.create',
    component: () => import('@/views/Post/PostCreateView.vue'),
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/posts/:id/edit',
    name: 'posts.edit',
    component: () => import('@/views/Post/PostEditView.vue'),
    meta: {
      layout: DefaultLayout
    }
  },

  {
    path: '/tags',
    name: 'tags.index',
    component: () => import('@/views/Tag/TagListingView.vue'),
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/categories',
    name: 'categories.index',
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
