<template>
  <a-layout-sider
    v-model:collapsed="storeMenu.collapsed"
    :trigger="null"
    collapsible
    class="!bg-[#ebebeb] sidebar"
    width="190px"

  >
    <div class="logo-container bg-[#001529] cursor-pointer" role="button" @click="handleClickLogo">
      <img src="@/assets/logo.svg" class="logo" />
      <div class="logo-text">SenHub.com</div>
    </div>

    <a-menu theme="dark" mode="inline" class="main-menu" v-model:selectedKeys="selectedKeys">
      <a-menu-item v-for="(menu, key) in menus" :key="key" class="">
        <component :is="menu.icon" />
        <span>{{ menu.title }}</span>
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

const handleClickLogo = () => {}
</script>

<style>
.ant-layout-sider.ant-layout-sider-collapsed .text-logo {
  @apply hidden;
}

.ant-layout-sider .logo {
  display: block;
}

.logo-container {
  height: 56px;
  @apply flex items-center justify-center px-[24px];
}

.logo-compact,
.logo {
  height: 25px;
}

.logo-text {
  @apply text-white pl-1 font-medium whitespace-nowrap overflow-hidden;
}

/**
 * ---------------------------------
 * MENU Styles
 * ---------------------------------
*/

.ant-layout-sider.sidebar .ant-menu-item-selected {
  @apply bg-white;
  @apply text-black;
}

.ant-layout-sider.sidebar .ant-menu-title-content {
  @apply font-medium flex items-center;
}

.ant-layout-sider.sidebar .ant-menu-item-group {
  @apply mb-4;
}

.ant-layout-sider.sidebar .ant-menu-item-group-title {
  @apply text-xs font-semibold !py-2 !px-4;
}

.ant-layout-sider.sidebar .ant-menu-submenu-title,
.ant-layout-sider.sidebar .ant-menu-item {
  @apply h-[30px] leading-[30px];
}

.ant-layout-sider.sidebar .ant-menu-sub.ant-menu-inline {
  @apply !bg-transparent;
}
</style>
