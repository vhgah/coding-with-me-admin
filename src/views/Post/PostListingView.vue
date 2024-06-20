<template>
  <a-form>
    <a-form-item label="Title">
      <a-input v-model:value="postFilters.keyword" />
    </a-form-item>
    <a-form-item label="Status">
      <a-select v-model:value="postFilters.status">
        <a-select-option value="1">Active</a-select-option>
        <a-select-option value="0">Inactive</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <div class="flex gap-2">
        <a-button type="primary" @click="fetchData">Search</a-button>
      <a-button @click="handleClickCreatePost">Create</a-button>
      </div>
    </a-form-item>
  </a-form>
  <a-table
    :dataSource="dataSource"
    :columns="columns"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
  <template #bodyCell="{ column, text }">
      <template v-if="column.dataType === 'datetime'">
        {{ humanDate(text) }}
      </template>
      <template v-if="column.dataIndex === 'status'">
        {{ text === 1 ? 'Active' : 'Inactive' }}
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import usePostApi from '@/composables/usePostApi'
import { message } from 'ant-design-vue'
import { computed, onMounted, ref } from 'vue'
import { humanDate } from '@/helpers/datetime'
import { useRouter } from 'vue-router'

const postFilters: any = ref({
  page: 1,
  per_page: 15,
  status: '',
  keyword: '',
})

const router = useRouter()

onMounted(() => fetchData())

const handleClickCreatePost = () => {
  router.push({ name: 'post.create' })
}

const fetchData = async () => {
  const postApi = usePostApi()
  loading.value = true

  const {
    hasError, errorMessage, successData, total
  } = await postApi.paginate(postFilters.value)

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
  current: postFilters.value.page,
  pageSize: postFilters.value.per_page,
}))

const handleTableChange = (pagination: any) => {
  postFilters.value.page = pagination.current
  fetchData()
}

const columns = ref([
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 200,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Created at',
    dataIndex: 'created_at',
    key: 'created_at',
    dataType: 'datetime',
  },
  {
    title: 'Updated at',
    dataIndex: 'updated_at',
    key: 'updated_at',
    dataType: 'datetime',
  },
  {
    title: 'Published at',
    dataIndex: 'published_at',
    key: 'published_at',
    dataType: 'datetime',
  },
])
</script>
