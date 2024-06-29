import axios from 'axios'
import { apiConfig } from '@/config/app'
import { useAuthStore } from '@/stores/auth'

const instance = axios.create(apiConfig.client)

instance.interceptors.request.use(
  (config) => {
    if (config.headers['Content-Type'] === undefined) {
      config.headers['Content-Type'] = 'application/json'
    }

    config.headers['Accept'] = 'application/json'

    const authStore = useAuthStore()
    config.headers['Authorization'] = `Bearer ${authStore.token}`

    return config
  },
  (error) => Promise.reject(error)
)

export default instance
