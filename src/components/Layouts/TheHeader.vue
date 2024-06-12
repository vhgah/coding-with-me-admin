<template>
  <a-layout-header class="!bg-white">
    <MenuUnfoldOutlined
      v-if="menuStore.collapsed"
      @click="menuStore.toggleCollapse"
    />
    <MenuFoldOutlined v-else @click="menuStore.toggleCollapse" />
  </a-layout-header>
</template>
<script lang="ts" setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()
</script>