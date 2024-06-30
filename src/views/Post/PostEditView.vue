<template>
  <a-form
    :model="formState"
    :label-col="{ span: 3 }"
    :wrapper-col="{ span: 19 }"
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
      :rules="[{ required: true, message: 'Please input the slug!' }]"
    >
      <a-input v-model:value="formState.slug" @input="handleSlugInput" />
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
    <a-form-item label="Published at" name="published_at">
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
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { postStatus } from '@/utils/constants'
import Tiptap from '@/components/Tiptap/Tiptap.vue'
import usePostApi from '@/api/requests/post'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { toSlug } from '@/helpers/string'

const route = useRoute()
const router = useRouter()
const isReady = ref(false)
const updating = ref(false)

const formState = ref({
  title: '',
  slug: '',
  summary: '',
  content: '',
  status: '',
  publishedAt: ''
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

watch(
  formState,
  ({ title }) => {
    formState.value.slug = toSlug(title)
  },
  {
    deep: true
  }
)
</script>
