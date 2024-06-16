import httpClient from '@/api/httpClient'
import { userFactory } from '@/factories/user'

export default function useUserApi () {
  const get = async (params: any) => {
    let hasError: Boolean = false
    let errorMessage: String = ''
    let errorCode: Number = 0
    let successData: any = null
    let total: number = 0
    try {
      const { data } = await httpClient.get('admin/users', {
        params
      })
      const users = data.data

      successData = Object.keys(users).map((key) => {
        return userFactory(users[key])
      })
      total = data.total

    } catch (error: any) {
      console.log(error)
      hasError = true
      errorMessage = error.response.data.message
      errorCode = error.response.status

    }
    return {
      hasError,
      errorMessage,
      errorCode,
      successData,
      total,
    }
  }

  return {
    get
  }
}
