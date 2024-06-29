import { toCamelCase, toSnakeCase } from '@/helpers/object'

const isPosifyResponseError = (response) => {
  return response?.data?.code && response?.data?.message
}

export default (httpClient) => {
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
    (response) => {
      if (response.data) {
        response.data = toCamelCase(response.data)
      }

      return response
    },

    (error) => {
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
