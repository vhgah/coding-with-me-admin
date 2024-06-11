<template>
  <a-layout>
    <TheMenu />
    <a-layout>
      <TheHeader />
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import TheMenu from '@/components/Layouts/TheMenu.vue'
import TheHeader from '@/components/Layouts/TheHeader.vue'
</script>
