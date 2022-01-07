import { useRequest as useRequestBase } from 'ahooks'
import { Options, Service } from 'ahooks/lib/useRequest/src/types'

export const useRequest = <TData, TParams extends unknown[]>(
    service: Service<TData, TParams>,
    options?: Options<TData, TParams>
) => {
    return useRequestBase(service, options)
}
