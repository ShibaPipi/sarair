import { useMemo } from 'react'
import { sort } from 'ramda'

import { useListRequest, useManualRequest } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'

import type { Health, HealthFormData, KeeperEnum } from '../models/health'

export const useKeepers = (currentKeeper: KeeperEnum) => {
    const {
        list: res,
        loading: listLoading,
        error: listError,
        getList
    } = useListRequest(
        (params?: Partial<Health>) =>
            sarairRequest
                .get<Health[]>('keepers', params)
                .then(sort((prev, next) => prev.created - next.created)) // DTO
    )

    const {
        loading: createLoading,
        error: createError,
        runAsync: create
    } = useManualRequest(
        (formData: HealthFormData) =>
            sarairRequest.post<Health>('keepers', formData),
        { onSuccess: () => getList() }
    )

    const list = useMemo(
        () => res.filter(({ name }) => name === currentKeeper),
        [currentKeeper, res]
    )

    return {
        list,
        loading: listLoading || createLoading,
        error: listError || createError,
        methods: { create }
    }
}
