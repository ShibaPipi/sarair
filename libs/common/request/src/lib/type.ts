import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface SarairInterceptorManager {
  request?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestCatch?: (error: any) => any
  response?: (config: AxiosResponse) => AxiosResponse
  responseCatch?: (error: any) => any
}

export interface SarairRequestConfig extends AxiosRequestConfig {
  interceptors?: SarairInterceptorManager
}
