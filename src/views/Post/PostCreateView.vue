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
      <a-button :loading="creating" type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { postStatus } from '@/utils/constants'
import Tiptap from '@/components/Tiptap/Tiptap.vue'
import usePostApi from '@/api/requests/post'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { toSlug } from '@/helpers/string'

const router = useRouter()

const formState = ref({
  title: '',
  slug: '',
  summary: '',
  content: '',
  status: 3,
  publishedAt: ''
})

const creating = ref(false)

const onFinish = async (values: any) => {
  creating.value = true
  const postApi = await usePostApi()

  postApi
    .create(values)
    .then(({ data }: { data: any }) => {
      formState.value = data
      message.success('Create post successfully')
    })
    .catch((error: any) => {
      message.error(error?.response?.data?.message || 'An error occurred')
    })
    .finally(() => {
      creating.value = false
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
