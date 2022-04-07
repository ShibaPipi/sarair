import { getToken } from '@sarair/shared/utils'

import { Request } from '@sarair/shared/request'

const baseURL = 'http://localhost/api/keeper'
const timeout = 10000

export default new Request({
    baseURL,
    timeout,
    interceptors: {
        request: config => {
            // console.log('instance request interceptor')
            const token = getToken()
            token && (config.headers.Authorization = `bearer ${token}`)

            return config
        },
        response: res => {
            // console.log('instance response interceptor')
            return res.data.data
        }
    }
})
