<template>
  <a-table
    :dataSource="dataSource"
    :columns="columns"
    :pagination="pagination"
    :loading="loading"
    :scroll="{ x: 1268 }"
  >
  <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'country'">
        {{ record.state }}, {{ record.city }}, {{ record.country }}
      </template>
      <template v-if="column.dataType === 'datetime'">
        {{ humanDate(text) }}
      </template>
      <template v-if="column.dataType === 'boolean'">
        {{ text ? 'Yes' : 'No' }}
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import useUserApi from '@/composables/useUserApi'
import { message } from 'ant-design-vue'
import { computed, onMounted, ref } from 'vue'
import { humanDate } from '@/helpers/datetime'

const filters: any = ref({
  page: 1,
  per_page: 15,
})

onMounted(() => fetchData())

const fetchData = async () => {
  const userApi = useUserApi()
  loading.value = true

  const {
    hasError, errorMessage, successData, total
  } = await userApi.paginate(filters.value)

  loading.value = false
  if (hasError) {
    return message.error(errorMessage)
  }

  dataSource.value = successData
  totalRecord.value = total
}

const dataSource = ref([])
const loading = ref(false)
const totalRecord = ref(0)

const pagination = computed(() => ({
  total: totalRecord.value,
  current: filters.value.page,
  pageSize: filters.value.per_page,
}))

const columns = ref([
  {
    title: 'Date',
    dataIndex: 'created_at',
    key: 'created_at',
    dataType: 'datetime',
    fixed: 'left',
    width: 120,
  },
  {
    title: 'IP address',
    dataIndex: 'ip_address',
    key: 'ip_address',
    fixed: 'left',
    width: 220,
  },
  {
    title: 'Referral url',
    dataIndex: 'referral_url',
    key: 'referral_url',
    width: 300
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    width: 300
  },
  {
    title: 'Robot',
    dataIndex: 'is_robot',
    key: 'is_robot',
    dataType: 'boolean',
    width: 100,
  },
  {
    title: 'User agent',
    dataIndex: 'user_agent',
    key: 'user_agent',
    width: 300
  },
  {
    title: 'Device',
    dataIndex: 'device',
    key: 'device',
    width: 300
  }
])
</script>
