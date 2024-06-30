import setInterceptorConfig from './interceptors'
import mock from './mock'

import { apiConfig } from '@/config/app'
import type { AxiosInstance } from 'axios'

const httpClientModify = (httpClient: AxiosInstance) => {
  apiConfig.mock && mock(httpClient)
  setInterceptorConfig(httpClient)
}

export default async (httpClient: AxiosInstance, resourceName: string) => {
  httpClientModify(httpClient)
  try {
    return (await import(`./requests/${resourceName}.ts`)).default(httpClient)
  } catch (error) {
    console.error('Error importing requests', error)
    return {}
  }
}
