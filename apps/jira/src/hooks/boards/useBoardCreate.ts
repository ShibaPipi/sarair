import { useMemo } from 'react'

import { sarairRequest } from '@sarair/shared/request'
import {
    useCreateQueryConfig,
    useMutation
} from '@sarair/shared/hooks/react-query'
import { BOARD_LIST_CACHE_KEY, useBoardSearchParams } from '.'

import type { Board } from '../../types'

export const useBoardCreate = () => {
    const params = useBoardSearchParams()
    const queryKey = useMemo(() => [BOARD_LIST_CACHE_KEY, params], [params])

    const { isLoading, mutateAsync: create } = useMutation(
        (params: Partial<Board>) => sarairRequest.post('boards', params),
        useCreateQueryConfig(queryKey)
    )

    return {
        isLoading,
        methods: { create }
    }
}
