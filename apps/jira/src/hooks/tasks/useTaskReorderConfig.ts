import { QueryKey } from 'react-query'

import { useQueryConfig } from '@sarair/shared/hooks'
import { reorder } from '@sarair/shared/utils'

import type { SortProps } from '../../types'

export const useTaskReorderConfig = <
    TData extends { id: number },
    TError = unknown,
    TVariables = void,
    TContext = unknown
>(
    queryKey: QueryKey
) =>
    useQueryConfig<TData, TError, TVariables, TContext>(
        queryKey,
        (target, old) => {
            const orderedList = reorder({
                list: old || [],
                ...(target as unknown as SortProps)
            })
            return orderedList.map(item =>
                item.id === (target as unknown as SortProps).fromId
                    ? {
                          ...item,
                          boardId: (target as unknown as SortProps).toBoardId
                      }
                    : item
            )
        }
    )
