import { useMemo } from 'react'

import { BOARD_LIST_CACHE_KEY } from './index'

import type { Board } from '../../types/board'
import { useListQuery } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'

export const useBoardList = (params?: Partial<Board>) => {
    const queryKey = useMemo(() => [BOARD_LIST_CACHE_KEY, params], [params])

    const { isLoading, error, list } = useListQuery(queryKey, () =>
        sarairRequest.get<Board[]>('boards', params)
    )

    return {
        list,
        isLoading,
        error,
        methods: {}
    }
}
