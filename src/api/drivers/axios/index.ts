import setInterceptorConfig from './interceptors'
import mock from './mock'

import { apiConfig } from '@/config/app'

const httpClientModify = (httpClient) => {
  apiConfig.mock && mock(httpClient)
  setInterceptorConfig(httpClient)
}

export default async (httpClient, resourceName) => {
  httpClientModify(httpClient)
  try {
    return (await import(`./requests/${resourceName}.ts`)).default(httpClient)
  } catch (error) {
    console.error('Error importing requests', error)
    return {}
  }
}
