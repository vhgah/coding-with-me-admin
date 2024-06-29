import httpClient from '@/api/httpClient'

export default function useAuthApi () {
  const login = async (email: string, password: string) => {
    return httpClient.post('/admin/login', {
      email,
      password
    })
  }

  return {
    login
  }
}