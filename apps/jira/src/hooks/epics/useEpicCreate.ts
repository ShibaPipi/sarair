import { useMemo } from 'react'

import { sarairRequest } from '@sarair/shared/request'
import { useCreateQueryConfig, useMutation } from '@sarair/shared/hooks'
import { EPIC_LIST_CACHE_KEY, useEpicSearchParams } from '.'

import type { Epic } from '../../types'

export const useEpicCreate = () => {
    const params = useEpicSearchParams()
    const queryKey = useMemo(() => [EPIC_LIST_CACHE_KEY, params], [params])

    const {
        isLoading,
        error,
        mutateAsync: create
    } = useMutation(
        (params: Partial<Epic>) => sarairRequest.post('epics', params),
        useCreateQueryConfig(queryKey)
    )

    return {
        isLoading,
        error,
        methods: { create }
    }
}
