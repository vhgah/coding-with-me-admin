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
import { onMounted, ref } from 'vue'
import { UserOutlined,
  HomeOutlined,
  ProfileOutlined,
  TagsOutlined,
  AppstoreOutlined } from '@ant-design/icons-vue'

import { useMenuStore } from '@/stores/menu'
import { useRoute } from 'vue-router'

const storeMenu = useMenuStore()

const selectedKeys = ref<number[]>([])

const setMenuActive = () => {
  const route = useRoute()
  const currentMenuItem = menus.value.findIndex((menu) => menu.name === route.name)
  selectedKeys.value = [currentMenuItem]
}

onMounted(() => setMenuActive())

const menus = ref([
  {
    icon: HomeOutlined,
    router: '/',
    title: 'Home',
    name: 'home',
  },
  {
    icon: UserOutlined,
    router: '/users',
    title: 'User',
    name: 'user',
  },
  {
    icon: ProfileOutlined,
    router: '/posts',
    title: 'Post',
    name: 'post',
  },
  {
    icon: TagsOutlined,
    router: '/tags',
    title: 'Tag',
    name: 'tag',
  },
  {
    icon: AppstoreOutlined,
    router: '/categories',
    title: 'Category',
    name: 'category',
  }
])

</script>

<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
