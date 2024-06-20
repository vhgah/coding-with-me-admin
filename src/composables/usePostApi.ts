import httpClient from '@/api/httpClient'
import { postFactory } from '@/factories/post'

export default function usePostApi () {
  const paginate = async (params: any) => {
    let hasError: Boolean = false
    let errorMessage: String = ''
    let errorCode: Number = 0
    let successData: any = null
    let total: number = 0
    try {
      const { data } = await httpClient.get('admin/posts', {
        params
      })
      const posts = data.data

      successData = Object.keys(posts).map((key) => {
        return postFactory(posts[key])
      })
      total = data.total

    } catch (error: any) {
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
    paginate
  }
}
