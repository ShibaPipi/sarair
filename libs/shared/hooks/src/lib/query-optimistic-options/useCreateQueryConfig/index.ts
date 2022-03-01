import { QueryKey } from 'react-query'

import { useQueryConfig } from '../useQueryConfig'

export const useCreateQueryConfig = <
    TData = unknown,
    TError = unknown,
    TContext = unknown
>(
    queryKey: QueryKey
) =>
    useQueryConfig<TData, TError, TData, TContext>(queryKey, (target, old) =>
        old ? [...old, target] : []
    )
