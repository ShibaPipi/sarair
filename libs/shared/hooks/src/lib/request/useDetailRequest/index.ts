import { useRequest } from '../useRequest'

import type { Options, Service } from '../useRequest'

export const useDetailRequest = <TData, TParams extends unknown[]>(
    service: Service<TData, TParams>,
    options?: Options<TData, TParams>
) => {
    const res = useRequest(service, options)

    return { ...res, detail: res.data, getDetail: res.run }
}
