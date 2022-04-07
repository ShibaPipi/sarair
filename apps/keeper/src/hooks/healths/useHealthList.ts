import { useMemo } from 'react'
import { sort } from 'ramda'

import { useListQuery, useManualRequest } from '@sarair/shared/hooks'
import request from '../request'

import type { Health, HealthFormData, KeeperEnum } from '../models/health'

export const useKeepers = (currentKeeper: KeeperEnum) => {
    const {
        list: res,
        isLoading,
        error: listError
    } = useListQuery(
        (params?: Partial<Health>) =>
            request
                .get<Health[]>('healths', params)
                .then(res => {
                    console.log(res)
                    return res
                })
                .then(sort((prev, next) => prev.created - next.created)) // DTO
    )

    const {
        loading: createLoading,
        error: createError,
        runAsync: create
    } = useManualRequest(
        (formData: HealthFormData) => request.post<Health>('keepers', formData),
        { onSuccess: () => getList() }
    )

    const list = useMemo(
        () => res.filter(({ name }) => name === currentKeeper),
        [currentKeeper, res]
    )

    return {
        list,
        isLoading,
        isCreateLoading,
        error: listError || createError,
        methods: { create }
    }
}
