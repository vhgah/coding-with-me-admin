<template>
  <a-upload
    name="file"
    list-type="picture-card"
    :show-upload-list="false"
    :custom-request="customUpload"
    @change="handleChange"
  >
    <template v-if="fileList.length">
      <div class="sortable-list__item">
        <a-image :src="fileList[0].url" :alt="fileList[0].name" />
        <a-button
          type="text"
          class="close-button"
          shape="circle"
          size="small"
          @click="handleClickDeleteButton()"
        >
          <template #icon>
            <CloseCircleOutlined />
          </template>
        </a-button>
      </div>
    </template>
    <div v-else>
      <LoadingOutlined v-if="loading" />
      <PlusOutlined v-else />
    </div>
  </a-upload>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { message } from 'ant-design-vue'

import useFileApi from '@/composables/useFileApi'
import { LoadingOutlined, PlusOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'
import type { UploadChangeParam } from 'ant-design-vue'

const emit = defineEmits(['change'])

const loading = ref(false)
const fileList = ref([])

const props = defineProps({
  featuredImage: {
    type: Object,
    required: true
  }
})

watch(
  () => props.featuredImage,
  (value) => {
    fileList.value = [...value]
  },
  {
    immediate: true
  }
)

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }

  if (info.file.status === 'done') {
    loading.value = false
    emit('upload-done', fileList.value[0])
  }

  if (info.file.status === 'error') {
    loading.value = false
    message.error('upload error')
  }
}

const customUpload = async (options: any) => {
  const { file, onError, onSuccess } = options

  const fileApi = useFileApi()

  const { hasError, errorMessage, successData } = await fileApi.create(file, 'post')

  if (hasError) {
    message.error(errorMessage)
    onError({ event: errorMessage })
    return
  }

  console.log(successData)

  fileList.value = [successData]
  onSuccess()
}

const handleClickDeleteButton = () => {
  const file = fileList[0]
  console.log(file)
}
</script>
<style>
.sortable-list__item {
  @apply relative rounded overflow-hidden;
}

.sortable-list__item .close-button {
  @apply hidden;
}

.sortable-list__item:hover .close-button {
  @apply block;
  @apply absolute top-0 right-0 bg-transparent p-0 text-white;
}

.sortable-list__item .close-button:hover {
  @apply !bg-gray-500/70;
}
</style>
