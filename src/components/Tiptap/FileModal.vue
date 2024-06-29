<template>
  <a-modal
    :open="open"
    class="!w-7/12"
    title="Add/Select file modal"
    @ok="handleOk"
    @cancel="handleCancel"
    :ok-button-props="{ disabled: !Object.keys(fileSelected).length }"
  >
    <a-upload-dragger name="file" accept="image/*" :multiple="true" :custom-request="customUpload">
      <p class="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </a-upload-dragger>
    <div class="grid grid-cols-4 gap-4 mt-3 h-72 overflow-y-auto">
      <div
        v-for="file in files"
        :key="file.id"
        class="relative cursor-pointer"
        @click="handleClickFile(file)"
      >
        <img class="h-48 w-96 object-cover rounded-md" :src="file.url" alt="" />
        <div
          v-if="fileSelected.id === file.id"
          class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-35"
        />
      </div>
      <InfiniteLoading @infinite="loadFiles" />
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { InboxOutlined } from '@ant-design/icons-vue'
import useFileApi from '@/composables/useFileApi'
import { message } from 'ant-design-vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import type { FileType } from '@/types/file'

defineProps({
  open: Boolean,
  value: String
})

const fileFilters: any = ref({
  page: 1,
  per_page: 15,
  type: 'post'
})

const files = ref<FileType[]>([])

const loadFiles = async ($state: any) => {
  const fileApi = useFileApi()

  const {
    hasError, errorMessage, successData, total
  } = await fileApi.paginate(fileFilters.value)

  if (hasError) {
    message.error(errorMessage)
    $state.error()
    return
  }

  files.value = [...files.value, ...successData]

  if (files.value.length >= total) {
    $state.complete()
  } else {
    $state.loaded()
  }
}

const emit = defineEmits(['close', 'ok'])

const handleOk = () => {
  emit('ok', fileSelected.value)
}

const handleCancel = () => {
  emit('close')
}

const fileSelected = ref<FileType>({})
const handleClickFile = (file: FileType) => {
  if (fileSelected.value.id === file.id) {
    fileSelected.value = {}
    return
  }

  fileSelected.value = file
}

const customUpload = async (options: any) => {
  const {
    file, onError, onSuccess
  } = options

  const fileApi = useFileApi()

  const {
    hasError, errorMessage, successData
  } = await fileApi.create(file, 'post')

  if (hasError) {
    message.error(errorMessage)
    onError({ event: errorMessage })
    return
  }

  files.value.unshift(successData)
  onSuccess()
}
</script>
