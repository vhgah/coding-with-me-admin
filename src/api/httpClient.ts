import axios from 'axios'
import { apiConfig } from '@/config/app'
import { useAuthStore } from '@/stores/auth'

const instance = axios.create(apiConfig)

instance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Accept'] = 'application/json'

    const authStore = useAuthStore()
    config.headers['Authorization'] = `Bearer ${authStore.token}`

    return config
  }
)

export default instance