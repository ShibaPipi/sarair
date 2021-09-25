import axios from 'axios'

import type { AxiosInstance } from 'axios'
import type { SarairInterceptorManager, SarairRequestConfig } from './type'

class SarairRequest {
  // axios 实例
  instance: AxiosInstance

  // axios 拦截器
  interceptors?: SarairInterceptorManager

  constructor(config: SarairRequestConfig) {
    this.instance = axios.create(config)

    this.interceptors = config.interceptors

    // 实例请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.request,
      this.interceptors?.requestCatch
    )

    // 实例响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.response,
      this.interceptors?.responseCatch
    )

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('global request interceptor')
        return config
      },
      (error) => {
        // console.log('global request error interceptor')
        return error
      }
    )

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('global response interceptor')
        return res
      },
      (error) => {
        // console.log('global response error interceptor')
        return error
      }
    )
  }

  request(config: SarairRequestConfig) {
    // 请求单独拦截器
    config.interceptors?.request &&
      (config = config.interceptors.request(config))

    // 请求失败单独拦截器
    config.interceptors?.requestCatch &&
      (config = config.interceptors.requestCatch(config))

    return this.instance.request(config).then((res) => {
      // 响应单独拦截器
      config.interceptors?.response && (res = config.interceptors.response(res))

      // 响应失败单独拦截器
      config.interceptors?.responseCatch &&
        (res = config.interceptors.responseCatch(res))

      return res
    })
  }
}

export default SarairRequest
