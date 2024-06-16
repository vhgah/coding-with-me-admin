<template>
  <div class="logo text-center mb-4">
    <h4 class="text-2xl">Login Form</h4>
  </div>
  <a-form
    :model="formState"

    name="basic"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 20 }"
    autocomplete="off"
    @finish="onFinish"
  >
    <a-form-item
      label="Email"
      name="email"
      :rules="[
        {required: true, message: 'Please input your email!'},
        { type: 'email', message: 'The input is not valid E-mail'}
      ]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 4, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
      <a-button type="primary" html-type="submit" :loading="loading">Submit</a-button>
      </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const loading = ref(false)
const router = useRouter()

interface FormState {
  email: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  email: '',
  password: '',
  remember: true
})

const onFinish = async (values: any) => {
  loading.value = true
  const {
    hasError,
    errorMessage,
  } = await authStore.login(values.email, values.password)

  if (hasError) {
    loading.value = false
    message.error(errorMessage)
    return
  }

  router.push({ name: 'home' })

}
</script>
