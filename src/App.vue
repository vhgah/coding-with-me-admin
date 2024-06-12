<template>
  <a-config-provider :theme="theme">
    <component :is="layout">
      <RouterView />
    </component>
  </a-config-provider>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const layout = computed(() => route.meta.layout)

const theme = ref({
  token: {
    colorPrimary: '#00b96b'
  }
})
</script>
