import { toCamelCase, toSnakeCase } from '@/helpers/object'
import type { AxiosInstance } from 'axios'

const isPosifyResponseError = (response: any) => {
  return response?.data?.code && response?.data?.message
}

export default (httpClient: AxiosInstance) => {
  httpClient.interceptors.request.use((config) => {
    if (config.data) {
      config.data = toSnakeCase(config.data)
    }

    if (config.params) {
      config.params = toSnakeCase(config.params)
    }

    return config
  })

  httpClient.interceptors.response.use(
    (response: any) => {
      if (response.data) {
        response.data = toCamelCase(response.data)
      }

      return response
    },

    (error: any) => {
      const response = error.response || {}

      const platformError = {
        code: error.code,
        message: error.message,
        details: response.data || error.message
      }

      if (isPosifyResponseError(response)) {
        platformError.code = response.data.code
        platformError.message = response.data.message
        platformError.details = response.data || response.data.message
      }

      error.platformError = platformError

      return Promise.reject(error)
    }
  )
}
