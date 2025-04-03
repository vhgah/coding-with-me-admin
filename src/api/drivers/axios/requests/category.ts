import type { AxiosInstance } from 'axios'

const paginate = (httpClient: AxiosInstance, params: any) => {
  return httpClient.get('/admin/categories', {
    params
  })
}

const create = (httpClient: AxiosInstance, data: any) => {
  return httpClient.post('/admin/categories', data)
}

const update = (httpClient: AxiosInstance, id: number, data: any) => {
  return httpClient.put(`/admin/categories/${id}`, data)
}

const destroy = (httpClient: AxiosInstance, id: number) => {
  return httpClient.delete(`/admin/categories/${id}`)
}

const updateStatus = (httpClient: AxiosInstance, id: number, status: number) => {
  return httpClient.put(`admin/categories/${id}/status`, {
    status: status
  })
}

const getDetail = (httpClient: AxiosInstance, id: number) => {
  return httpClient.get(`/admin/categories/${id}`)
}

export default (httpClient: AxiosInstance) => ({
  paginate: (params: any) => paginate(httpClient, params),
  create: (data: any) => create(httpClient, data),
  update: (id: number, data: any) => update(httpClient, id, data),
  destroy: (id: number) => destroy(httpClient, id),
  updateStatus: (id: number, status: number) => updateStatus(httpClient, id, status),
  getDetail: (id: number) => getDetail(httpClient, id)
})
