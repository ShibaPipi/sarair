import SarairRequest from './sarair-request'
import { BASE_URL, TIMEOUT } from './config'

const sarairRequest = new SarairRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    request: (config) => {
      // console.log('instance request interceptor')
      const token = ''
      token && (config.headers.Authorization = `bearer ${token}`)

      return config
    },
    response: (res) => {
      // console.log('instance response interceptor')
      return res.data
    }
  }
})

export { sarairRequest }
