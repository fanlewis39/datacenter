import Axios from 'axios'

export const baseUrl = 'http://192.168.0.18/portal/report/'

Axios.defaults.baseURL = baseUrl
Axios.defaults.withCredentials = true

// 重写 post 方法
const _post = Axios.post

const pendingRequests = []

const testRequest = url => pendingRequests.find(item => item.url === url)

Axios.post = function (url, params = {}, ...args) {
  const fullUrl = baseUrl + url
  const request = testRequest(fullUrl)

  if (request) {
    return Promise.resolve({ state: 'fail' })
  }

  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return _post.call(Axios, url, params, ...args)
  }

  const _params = new URLSearchParams()

  for (let key in params) {
    _params.append(key, params[key])
  }

  pendingRequests.push(fullUrl)

  return _post.call(Axios, url, _params, ...args)
}

Axios.interceptors.response.use(
  res => {
    const index = pendingRequests.findIndex(item => item === res.config.url)

    if (~index) {
      pendingRequests.splice(index, 1)
    }

    if (res.status !== 200) {
      return Promise.resolve({ state: 'fail' })
    }

    const data = res.data

    return Promise.resolve(data)
  },
  error => Promise.reject(error)
)

export default Axios
