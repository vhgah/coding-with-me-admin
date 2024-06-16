<template>
  <div>
    <p>This is the home page</p>
    <p>
      {{ authStore.admin }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
