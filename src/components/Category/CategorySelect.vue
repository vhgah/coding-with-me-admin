<template>
  <a-select>
    <a-select-option
      v-for="category in categoryOptions"
      :key="category.value"
      :value="category.value"
    >
      {{ category.label }}
    </a-select-option>
  </a-select>
</template>
<script lang="ts" setup>
import useCategoryApi from '@/api/requests/category'
import { ref, onMounted } from 'vue'

const categoryOptions = ref([])

onMounted(async () => {
  const categoryApi = await useCategoryApi()

  categoryApi.paginate().then(({ data }: { data: any }) => {
    categoryOptions.value = data.data.map((category: any) => ({
      label: category.name,
      value: category.id
    }))
  })
})
</script>
