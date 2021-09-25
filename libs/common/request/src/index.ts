import SarairRequest from './lib/sarair-request'
import { BASE_URL, TIMEOUT } from './lib/config'

export default new SarairRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    request: (config) => {
      console.log('instance request interceptor')
      return config
    },
    responseCatch: (error) => {
      console.log('instance response err')
      return error
    }
  }
})
