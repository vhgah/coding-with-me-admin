<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
    <div class="logo">senhub</div>
    <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
      <a-menu-item v-for="(menu, key) in menus" :key="key" class="bg-red-300">
        <component :is="menu.icon" />
        <span>{{ menu.title }}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {
  UserOutlined,
  HomeOutlined,
  ProfileOutlined,
  TagsOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue'

const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>([])

const menus = [
  {
    icon: HomeOutlined,
    router: '',
    title: 'Home'
  },
  {
    icon: UserOutlined,
    router: '/users',
    title: 'User'
  },
  {
    icon: ProfileOutlined,
    router: '/posts',
    title: 'Post'
  },
  {
    icon: TagsOutlined,
    router: '/tags',
    title: 'Tag'
  },
  {
    icon: AppstoreOutlined,
    router: '/categories',
    title: 'Category'
  }
]
</script>
