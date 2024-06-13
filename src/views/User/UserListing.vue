<template>
  <a-table
    :dataSource="dataSource"
    :columns="columns"
  />
</template>
<script lang="ts" setup>
import useUserApi from '@/composables/useUserApi'
import { onMounted, ref } from 'vue'

onMounted(() => fetchData())

const fetchData = () => {
  const userApi = useUserApi()

  const { data } = userApi.get()

  console.log(data)
}

const dataSource = ref([

])

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
])
</script>
