import { useRequest } from '../useRequest'

import type { Options, Service } from '../useRequest'

export const useManualRequest = <TData, TParams extends unknown[]>(
    service: Service<TData, TParams>,
    options?: Options<TData, TParams>
) => useRequest(service, { ...options, manual: true })
