import httpClient from '@/api/httpClient'

export default function useUserApi() {
  const get = () => {
    return httpClient.get('/users')
  }

  return {
    get
  }
}
