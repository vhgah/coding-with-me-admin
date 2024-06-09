import axios from 'axios'
import { apiConfig } from '@/config/app'

const instance = axios.create(apiConfig)

instance.interceptors.request.use(
  (config) => {
    

    return config;
  }
)

export default instance