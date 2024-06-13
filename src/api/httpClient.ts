import axios from 'axios'
import { apiConfig } from '@/config/app'

const instance = axios.create(apiConfig)

instance.interceptors.request.use(
  (config) => {

    config.headers['Content-Type'] = 'application/json'
    config.headers['Accept'] = 'application/json'

    return config
  }
)

export default instance