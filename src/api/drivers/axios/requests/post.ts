import type { AxiosInstance } from 'axios'

const paginate = (httpClient: AxiosInstance, params: any) => {
  return httpClient.get('/admin/posts', {
    params
  })
}

const create = (httpClient: AxiosInstance, data: any) => {
  return httpClient.post('/admin/posts', data)
}

const update = (httpClient: AxiosInstance, id: number, data: any) => {
  return httpClient.put(`/admin/posts/${id}`, data)
}

const getDetail = (httpClient: AxiosInstance, id: number) => {
  return httpClient.get(`/admin/posts/${id}`)
}

export default (httpClient: AxiosInstance) => ({
  paginate: (params: any) => paginate(httpClient, params),
  create: (data: any) => create(httpClient, data),
  update: (id: number, data: any) => update(httpClient, id, data),
  getDetail: (id: number) => getDetail(httpClient, id)
})
