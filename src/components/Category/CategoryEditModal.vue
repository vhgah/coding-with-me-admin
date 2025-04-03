<template>
  <a-modal :open="show" title="Basic Modal" @ok="handleOk" @cancel="handleCancel">
    <a-form
      class="mt-8"
      :model="formState"
      ref="formRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
    >
      <a-form-item
        label="Name"
        name="name"
        :rules="[
          {
            required: true,
            message: 'Please input the name!'
          }
        ]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item
        label="Slug"
        name="slug"
        :rules="[
          {
            required: true,
            message: 'Please input the slug!'
          }
        ]"
      >
        <a-input v-model:value="formState.slug" />
      </a-form-item>
      <a-form-item
        label="Position"
        name="position"
        :rules="[
          {
            required: true,
            message: 'Please input the position!'
          }
        ]"
      >
        <a-input v-model:value="formState.position" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import useCategoryApi from '@/api/requests/category'
import { message, type FormInstance } from 'ant-design-vue'
import type { Category } from '@/types/category'

const props = defineProps<{
  show: boolean
  category: Category
}>()

const emit = defineEmits(['update:show', 'finish'])

const formRef = ref<FormInstance | null>(null)

const formState = ref({
  id: null,
  name: '',
  slug: '',
  position: '',
})

const updating = ref(false)

watch(
  () => props.category,
  (category) => {
    formState.value = {
      id: category.id,
      name: category.name,
      slug: category.slug,
      position: category.position,
    }
  }
)

const handleOk = async () => {
  await formRef.value?.validate()

  updating.value = true
  const categoryApi = await useCategoryApi()

  categoryApi
    .update(props.category.id, formState.value)
    .then(() => {
      message.success('Update category successfully')
      emit('finish')
    })
    .catch((error: any) => {
      message.error(error?.response?.data?.message || 'An error occurred')
    })
    .finally(() => {
      updating.value = false
    })
}

const handleCancel = () => {
  emit('update:show', false)
}
</script>
