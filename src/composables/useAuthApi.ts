import httpClient from '@/api/httpClient'

export default function useAuthApi() {
  const login = ({username, password}) => {
    httpClient.post('/api/login')
  }

  return {
    login
  }
}