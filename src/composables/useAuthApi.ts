import httpClient from '@/api/httpClient'

export default function useAuthApi () {
  const login = async (email: String, password: String) => {
    return httpClient.post('/admin/login', {
      email,
      password
    })
  }

  return {
    login
  }
}