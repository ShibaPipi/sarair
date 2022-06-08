import { QueryKey } from 'react-query'

import { useQueryConfig } from '@sarair/shared/hooks/react-query'
import { reorder } from '@sarair/shared/utils'
import { SortProps } from '../../types'

export const useBoardReorderConfig = <
    TData extends { id: number },
    TError = unknown,
    TVariables = void,
    TContext = unknown
>(
    queryKey: QueryKey
) =>
    useQueryConfig<TData, TError, TVariables, TContext>(
        queryKey,
        (target, old) =>
            reorder({
                list: old || [],
                ...(target as unknown as Pick<
                    SortProps,
                    'fromId' | 'referenceId' | 'type'
                >)
            })
    )
