import axios from 'axios'

import { cleanObjectNilValue, CommonObject } from '@sarair/shared/utils'

import { message } from '@sarair/desktop/shared/ui'

import type { AxiosInstance } from 'axios'
import type { SarairInterceptorManager, SarairRequestConfig } from './type'

enum HttpMethodEnum {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

class SarairRequest {
    // axios 实例
    instance: AxiosInstance

    // axios 拦截器
    interceptors?: SarairInterceptorManager

    constructor(config: SarairRequestConfig) {
        // 创建实例
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
            config => {
                // console.log('global request interceptor')
                return config
            },
            error => {
                // console.log('global request error interceptor')
                return error
            }
        )

        // 全局响应拦截器
        this.instance.interceptors.response.use(
            res => {
                // console.log('global response interceptor')
                return res
            },
            error => {
                // console.log('global response error interceptor')
                switch (error.message) {
                    case 'Network Error':
                        message.error(error.message)
                        return
                    default:
                        return Promise.reject(error.response.data)
                }
            }
        )
    }

    request<T>(config: SarairRequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            // 请求单独拦截器
            config.interceptors?.request &&
                (config = config.interceptors.request(config))

            // 请求失败单独拦截器
            config.interceptors?.requestCatch &&
                (config = config.interceptors.requestCatch(config))

            this.instance
                .request<unknown, T>(config)
                .then(res => {
                    // 响应单独拦截器
                    config.interceptors?.response &&
                        (res = config.interceptors.response(res))

                    // 响应失败单独拦截器
                    config.interceptors?.responseCatch &&
                        (res = config.interceptors.responseCatch(res))

                    resolve(res)
                })
                .catch(error => {
                    reject(error)

                    return error
                })
        })
    }

    get<T>(
        url: string,
        params?: CommonObject,
        config?: SarairRequestConfig<T>
    ): Promise<T> {
        return this.request<T>({
            ...config,
            url,
            method: 'GET',
            params: params ? cleanObjectNilValue(params) : params
        })
    }

    post<T>(
        url: string,
        data?: unknown,
        config?: SarairRequestConfig<T>
    ): Promise<T> {
        return this.request<T>({
            ...config,
            url,
            method: HttpMethodEnum.POST,
            data
        })
    }

    put<T>(
        url: string,
        data?: unknown,
        config?: SarairRequestConfig<T>
    ): Promise<T> {
        return this.request<T>({
            ...config,
            url,
            method: HttpMethodEnum.PUT,
            data
        })
    }

    patch<T>(
        url: string,
        data?: unknown,
        config?: SarairRequestConfig<T>
    ): Promise<T> {
        return this.request<T>({
            ...config,
            url,
            method: HttpMethodEnum.PATCH,
            data
        })
    }

    delete<T>(url: string, config?: SarairRequestConfig<T>): Promise<T> {
        return this.request<T>({
            ...config,
            url,
            method: HttpMethodEnum.DELETE
        })
    }
}

export default SarairRequest
