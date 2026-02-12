import axios from 'axios'

const api = async (method, url, data = {}) => {
  const instance = axios.create()

  instance.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem('userId'))
      if (token) {
        config.headers.Authorization = `Bearer ${token.token}`
      }
      return config
    },
    (err) => {
      console.log(err)
    },
  )

  const request = {
    post: () => instance.post(url, data),
    get: () => instance.get(url),
    delete: () => instance.delete(url),
    patch: () => instance.patch(url, data),
  }

  return request[method]()
}

export default api
