import { useRequest } from '../useRequest'

import type { Options, Service } from '../useRequest'

export const useListRequest = <TData, TParams extends unknown[]>(
    service: Service<TData[], TParams>,
    options?: Options<TData[], TParams>
) => {
    const list: TData[] = []
    const res = useRequest(service, options)

    return { ...res, list: res.data || list, getList: res.run }
}
