<template>
  <a-form
    :model="formState"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
    @finish="onFinish"
  >
    <a-form-item
      label="Title"
      name="title"
      :rules="[
        {
          required: true,
          message: 'Please input the title!'
        }
      ]"
    >
      <a-input v-model:value="formState.title" />
    </a-form-item>

    <a-form-item
      label="Slug"
      name="slug"
      class="w-full"
      :rules="[{ required: true, message: 'Please input the slug!' }]"
    >
      <a-flex :gap="10">
        <a-input
          class="w-full"
          style="flex: 1"
          :readonly="slugAuto"
          v-model:value="formState.slug"
          @input="handleSlugInput"
        />
        <a-button @click="slugAuto = !slugAuto">{{ slugAuto ? 'Edit' : 'Auto' }}</a-button>
      </a-flex>
    </a-form-item>
    <a-form-item label="Upload" name="featuredImage">
      <div class="ant-upload-container">
        <div
          v-if="formState.featuredImage"
          class="relative rounded overflow-hidden max-w-full max-h-full"
        >
          <a-image :src="formState.featuredImage" alt="featured image" />
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
        <div v-else @click="handleClickFeaturedImage" class="ant-upload">
          <PlusOutlined />
        </div>
      </div>
    </a-form-item>
    <a-form-item label="Category" name="categoryId">
      <CategorySelect v-model:value="formState.categoryId" />
    </a-form-item>
    <a-form-item label="Summary" name="summary">
      <a-textarea v-model:value="formState.summary" :rows="3" :maxlength="255" show-count />
    </a-form-item>
    <a-form-item
      label="Content"
      name="content"
      :rules="[
        {
          required: true,
          message: 'Please input the content!'
        }
      ]"
    >
      <Tiptap v-model:value="formState.content" />
    </a-form-item>
    <a-form-item label="Status" name="status">
      <a-select v-model:value="formState.status" :options="postStatus"> </a-select>
    </a-form-item>
    <a-form-item label="Published at" name="publishedAt">
      <a-date-picker
        v-model:value="formState.publishedAt"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button @click="handleClickBackButton" class="mr-3">Back</a-button>
      <a-button :loading="updating" type="primary" html-type="submit">Update</a-button>
    </a-form-item>
  </a-form>
  <FileModal :open="fileModal.open" @ok="handleFileModalOk" @close="handleFileModalClose" />
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { postStatus } from '@/utils/constants'
import Tiptap from '@/components/Tiptap/Tiptap.vue'
import CategorySelect from '@/components/Category/CategorySelect.vue'
import usePostApi from '@/api/requests/post'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { toSlug } from '@/helpers/string'
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'
import FileModal from '@/components/Tiptap/FileModal.vue'
import type { File } from '@/types/file'

const route = useRoute()
const router = useRouter()
const isReady = ref(false)
const updating = ref(false)
const slugAuto = ref(true)

const fileModal = ref({
  open: false,
  value: ''
})

const formState = ref({
  title: '',
  slug: '',
  image: '',
  categoryId: null,
  summary: '',
  content: '',
  status: '',
  publishedAt: '',
  featuredImage: ''
})

const fetchPostData = async () => {
  const hide = message.loading('Loading product data...')
  isReady.value = false
  const postApi = await usePostApi()
  const postId = parseInt(route.params.id as string)

  if (isNaN(postId)) {
    hide()
    message.error('Post ID is invalid')
    return
  }

  return postApi
    .getDetail(postId)
    .then(({ data }: { data: any }) => {
      isReady.value = true
      slugAuto.value = false

      formState.value = data
    })
    .catch((error: any) => {
      message.error(error?.response?.data?.message || 'An error occurred')
    })
    .finally(() => {
      hide()
    })
}

onMounted(() => fetchPostData())

const onFinish = async (values: any) => {
  updating.value = true
  const postApi = await usePostApi()
  const postId = parseInt(route.params.id as string)

  postApi
    .update(postId, values)
    .then(({ data }: { data: any }) => {
      formState.value = data
      message.success('Update post successfully')
    })
    .catch((error: any) => {
      message.error(error?.response?.data?.message || 'An error occurred')
    })
    .finally(() => {
      updating.value = false
    })
}

const handleClickBackButton = () => {
  router.push({ name: 'posts.index' })
}

const handleSlugInput = (event: any) => {
  formState.value.slug = toSlug(event.target.value)
}

const handleClickFeaturedImage = () => {
  fileModal.value.open = true
}

const handleClickDeleteButton = () => {
  formState.value.featuredImage = ''
}

const handleFileModalOk = (file: File) => {
  fileModal.value.open = false
  formState.value.featuredImage = file.url
}

const handleFileModalClose = () => {
  fileModal.value.open = false
}

watch(
  () => formState.value.title,
  () => {
    if (!slugAuto.value) {
      return
    }

    formState.value.slug = toSlug(formState.value.title)
  }
)
watch(
  () => slugAuto.value,
  () => {
    if (!slugAuto.value) {
      return
    }

    formState.value.slug = toSlug(formState.value.title)
  }
)
</script>
<style>
.ant-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.ant-upload-container {
  width: 102px;
  height: 102px;
  margin-inline-end: 8px;
  margin-bottom: 8px;
  text-align: center;
  vertical-align: top;
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.ant-upload-container .close-button {
  @apply hidden;
}

.ant-upload-container:hover .close-button {
  @apply block;
  @apply absolute top-0 right-0 bg-transparent p-0 text-white;
}

.ant-upload-container .close-button:hover {
  @apply !bg-gray-500/70;
}
</style>
