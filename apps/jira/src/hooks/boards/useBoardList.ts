import { useListQuery } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'

import type { Board } from '../../types/board'
import { useBoardListQueryKey } from './useBoardListQueryKey'

export const useBoardList = (params?: Partial<Board>) => {
    const queryKey = useBoardListQueryKey()

    const { isLoading, error, list } = useListQuery(queryKey, () =>
        sarairRequest.get<Board[]>('boards', params)
    )

    return {
        list,
        isLoading,
        error
    }
}
