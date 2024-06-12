<template>
  <a-layout-sider
    v-model:collapsed="storeMenu.collapsed"
    :trigger="null"
    collapsible
  >
    <div class="logo" />
    <a-menu theme="dark" mode="inline" class="main-menu" v-model:selectedKeys="selectedKeys">
      <a-menu-item v-for="(menu, key) in menus" :key="key">
        <router-link :to="menu.router">
          <component :is="menu.icon" />
        <span>{{ menu.title }}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { UserOutlined,
  HomeOutlined,
  ProfileOutlined,
  TagsOutlined,
  AppstoreOutlined } from '@ant-design/icons-vue'

import { useMenuStore } from '@/stores/menu'

const selectedKeys = ref<string[]>([])
const storeMenu = useMenuStore()

const menus = [
  {
    icon: HomeOutlined,
    router: '/',
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

<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
