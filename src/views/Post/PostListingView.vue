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
        {{ text ? humanDate(text) : '' }}
      </template>
      <template v-if="column.dataType === 'status'">
        {{ text === 1 ? 'Active' : 'Inactive' }}
      </template>
      <template v-if="column.dataType === 'action'">
        <router-link
          class="text-blue-600 hover:underline hover:text-blue-500"
          :to="{ name: 'posts.edit', params: { id: text.id } }"
          >Edit
        </router-link>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import usePostApi from '@/api/requests/post'
import { message } from 'ant-design-vue'
import { computed, onMounted, ref } from 'vue'
import { humanDate } from '@/helpers/datetime'
import { useRouter } from 'vue-router'
import { postFactory } from '@/factories/post'

const postFilters: any = ref({
  page: 1,
  per_page: 15,
  status: '',
  keyword: ''
})

const router = useRouter()

onMounted(() => fetchData())

const handleClickCreatePost = () => {
  router.push({ name: 'posts.create' })
}

const fetchData = async () => {
  const postApi = await usePostApi()
  loading.value = true
  try {
    postApi.paginate(postFilters.value).then(({ data }) => {
      dataSource.value = data.data.map((item: any) => {
        return postFactory(item)
      })
      totalRecord.value = data.total
    })
  } catch (error) {
    message.error('Failed to fetch data')
  } finally {
    loading.value = false
  }
}

const dataSource = ref([])
const loading = ref(false)
const totalRecord = ref(0)

const pagination = computed(() => ({
  total: totalRecord.value,
  current: postFilters.value.page,
  pageSize: postFilters.value.per_page
}))

const handleTableChange = (pagination: any) => {
  postFilters.value.page = pagination.current
  fetchData()
}

const columns = ref([
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 200
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    dataType: 'status'
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    dataType: 'datetime'
  },
  {
    title: 'Updated at',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    dataType: 'datetime'
  },
  {
    title: 'Published at',
    dataIndex: 'publishedAt',
    key: 'publishedAt',
    dataType: 'datetime'
  },
  {
    title: 'Action',
    key: 'action',
    dataType: 'action'
  }
])
</script>
@/api/requests/post
