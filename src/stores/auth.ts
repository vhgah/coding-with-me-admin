import { ref } from 'vue'
import { defineStore } from 'pinia'
import { adminFactory } from '@/factories/admin'
import type { Admin } from '@/types/admin'
import useAuthApi from '@/composables/useAuthApi'

export const useAuthStore = defineStore(
  'useAuthStore',
  () => {
    const token = ref('')
    const admin = ref<Admin>(adminFactory())

    const login = async (email: string, password: string) => {
      const authApi = useAuthApi()
      let hasError: boolean = false
      let errorMessage: string = ''
      let errorCode: number = 0

      try {
        const { data } = await authApi.login(email, password)
        token.value = data.token
        admin.value = adminFactory(data.admin)
      } catch (error: any) {
        hasError = true
        errorMessage = error?.response?.data?.message
        errorCode = error?.response?.status
      }

      return {
        hasError,
        errorMessage,
        errorCode
      }
    }

    const logout = () => {
      token.value = ''
      admin.value = adminFactory()
    }

    return {
      token,
      admin,
      login,
      logout
    }
  },
  {
    persist: true
  }
)
