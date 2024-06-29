const apiURL = import.meta.env.VITE_API_URL

interface ApiConfigInterface {
  mock: boolean
  driver: string
  client: {
    baseURL: string
    timeout: number
  }
}

export const apiConfig: ApiConfigInterface = {
  mock: true,
  driver: 'axios',
  client: {
    baseURL: apiURL,
    timeout: 15 * 10000 // 150 seconds,
  }
}
