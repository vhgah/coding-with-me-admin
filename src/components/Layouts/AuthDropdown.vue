<template>
  <a-dropdown
    class="flex items-center justify-end px-5 cursor-pointer dark:hover:bg-gray-200 hover:bg-gray-400/10 duration-300 transition-colors ml-auto h-[56px] min-w-44"
  >
    <div class="flex leading-4">
      <a-avatar :style="{ backgroundColor: token.colorPrimary }">
        {{ firstLetter }}
      </a-avatar>
      <div class="hidden md:block">
        <div class="font-medium ml-2">
          {{ admin.email }}
        </div>
        <div class="ml-2">
          {{ admin.role }}
        </div>
      </div>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <UserOutlined class="mr-2" />
          Account settings
        </a-menu-item>
        <a-menu-item @click="handleClickButtonLogout">
          <PoweroffOutlined class="mr-2" />
          Logout
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { UserOutlined, PoweroffOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const { useToken } = theme
const { token } = useToken()
const authStore = useAuthStore()

const admin = computed(() => authStore.admin)

const firstLetter = computed(() => admin.value?.email?.charAt(0).toUpperCase())

const handleClickButtonLogout = () => {
  authStore.logout()

  router.push({ name: 'login' })
}
</script>
