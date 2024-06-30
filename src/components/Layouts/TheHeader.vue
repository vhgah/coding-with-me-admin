<template>
  <a-layout-header class="!bg-white flex items-center">
    <MenuUnfoldOutlined
      v-if="menuStore.collapsed"
      @click="menuStore.toggleCollapse"
    />
    <MenuFoldOutlined v-else @click="menuStore.toggleCollapse" />
    <AuthDropdown />
  </a-layout-header>
</template>
<script lang="ts" setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useMenuStore } from '@/stores/menu'
import AuthDropdown from './AuthDropdown.vue'

const menuStore = useMenuStore()
</script>