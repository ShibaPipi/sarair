import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface SarairInterceptorManager<T = AxiosResponse> {
  request?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestCatch?: (error: any) => any
  response?: (config: T) => T
  responseCatch?: (error: any) => any
}

export interface SarairRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: SarairInterceptorManager<T>
}
