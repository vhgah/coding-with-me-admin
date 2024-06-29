import httpClient from './httpClient'

import { apiConfig } from '@/config/app'

export default async (resourceName: string) => {
  try {
    const apiDriver = await import(`@/api/drivers/${apiConfig.driver}/index.ts`)
    return apiDriver.default(httpClient, resourceName)
  } catch (error) {
    console.error('Error loading API driver', error)
  }
}
