import httpClient from '@/api/httpClient'

export default function useAuthApi () {
  const login = async (email: string, password: string) => {
    return httpClient.post('/login', {
      email,
      password
    })
  }

  return {
    login
  }
}