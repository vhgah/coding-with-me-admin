const paginate = (httpClient, params) => {
  return httpClient.get('/admin/posts', {
    params
  })
}

const create = (httpClient, data) => {
  return httpClient.post('/admin/posts', data)
}

const update = (httpClient, id, data) => {
  return httpClient.put(`/admin/posts/${id}`, data)
}

const getDetail = (httpClient, id) => {
  return httpClient.get(`/admin/posts/${id}`)
}

export default (httpClient) => ({
  paginate: (params) => paginate(httpClient, params),
  create: (data) => create(httpClient, data),
  update: (id, data) => update(httpClient, id, data),
  getDetail: (id) => getDetail(httpClient, id)
})
