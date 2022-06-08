import { QueryKey } from 'react-query'

import { useQueryConfig } from '../useQueryConfig'

export const useDeleteQueryConfig = <
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
>(
    queryKey: QueryKey
) =>
    useQueryConfig<TData, TError, TVariables, TContext>(
        queryKey,
        (target, old) =>
            old?.filter(
                (item) =>
                    (item as unknown as { id: number }).id !==
                    (target as unknown as { id: number }).id
            ) || []
    )
