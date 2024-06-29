import { fileFactory } from '@/factories/file'
import httpClient from '@/api/httpClient'

export default function useFileApi () {
  const paginate = async (params: any = {}) => {
    let hasError: boolean = false
    let errorMessage: string = ''
    let errorCode: number = 0
    let successData: any = null
    let total: number = 0

    try {
      const { data } = await httpClient.get('/admin/files', {
        params
      })
      const files = data.data

      successData = Object.keys(files).map((key) => {
        return fileFactory(files[key])
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
      total
    }
  }

  const create = async (file: any, type: string) => {
    let hasError: boolean = false
    let errorMessage: string = ''
    let errorCode: number = 0
    let successData: any = null

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const { data } = await httpClient.post('/admin/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      successData = fileFactory(data)
    } catch (error: any) {
      hasError = true
      errorMessage = error.response.data.message
      errorCode = error.response.status
    }

    return {
      hasError,
      errorMessage,
      errorCode,
      successData
    }
  }

  return {
    paginate,
    create
  }
}
