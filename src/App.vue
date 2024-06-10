<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const layout = computed(() => route.meta.layout)
</script>
