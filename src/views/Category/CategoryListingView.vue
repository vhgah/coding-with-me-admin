<template>
  <a-form>
    <a-form-item label="Title">
      <a-input v-model:value="categoryFilters.keyword" />
    </a-form-item>
    <a-form-item label="Status">
      <a-select v-model:value="categoryFilters.status">
        <a-select-option value="1">Active</a-select-option>
        <a-select-option value="0">Inactive</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <div class="flex gap-2">
        <a-button type="primary" @click="fetchData">Search</a-button>
        <a-button @click="handleClickCreateCategory">Create</a-button>
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
    <template #bodyCell="{ column, record: category }">
      <template v-if="column.dataType === 'action'">
        <a-space>
          <a-button size="small" @click="handleClickEditCategory(category)"> Edit </a-button>
          <a-popconfirm title="Sure to delete?" @confirm="handleClickDeleteCategory(category)">
            <a-button size="small" danger> Delete </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </template>
  </a-table>
  <CategoryCreateModal
    v-model:show="categoryCreateModal.show"
    @finish="handleFinishCreateCategory"
  />
  <CategoryEditModal
    v-model:show="categoryEditModal.show"
    :category="categoryEditModal.category"
    @finish="handleFinishEditCategory"
  />
</template>
<script lang="ts" setup>
import useCategoryApi from '@/api/requests/category'
import { message } from 'ant-design-vue'
import { computed, onMounted, ref } from 'vue'
import { categoryFactory } from '@/factories/category'
import CategoryCreateModal from '@/components/Category/CategoryCreateModal.vue'
import type { Category } from '@/types/category'
import CategoryEditModal from '@/components/Category/CategoryEditModal.vue'

const categoryFilters: any = ref({
  page: 1,
  per_page: 15,
  status: '',
  keyword: ''
})

const categoryCreateModal = ref({
  show: false
})

const categoryEditModal = ref({
  show: false,
  category: {} as Category
})

onMounted(() => fetchData())

const handleClickCreateCategory = () => {
  categoryCreateModal.value.show = true
}

const handleClickEditCategory = (category: Category) => {
  categoryEditModal.value.show = true
  categoryEditModal.value.category = category
}

const handleClickDeleteCategory = async (category: Category) => {
  const categoryApi = await useCategoryApi()
  categoryApi
    .destroy(category.id)
    .then(() => {
      fetchData()
      message.success('Category deleted successfully')
    })
    .catch(({ platformError }: { platformError: PlatformError }) => {
      message.error(platformError.details?.message)
    })
}

const handleFinishCreateCategory = () => {
  categoryCreateModal.value.show = false
  fetchData()
}

const handleFinishEditCategory = () => {
  categoryEditModal.value.show = false
  fetchData()
}

const fetchData = async () => {
  const categoryApi = await useCategoryApi()
  loading.value = true
  try {
    categoryApi.paginate(categoryFilters.value).then(({ data }: { data: any }) => {
      dataSource.value = data.data.map((item: any) => {
        return categoryFactory(item)
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
  current: categoryFilters.value.page,
  pageSize: categoryFilters.value.per_page
}))

const handleTableChange = (pagination: any) => {
  categoryFilters.value.page = pagination.current
  fetchData()
}

const columns = ref([
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug'
  },
  {
    title: 'Action',
    key: 'action',
    dataType: 'action',
    width: 80
  }
])
</script>
