import { useMemo } from 'react'
import { sort } from 'ramda'

import { useListRequest, useRequest } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'

import type { Health, HealthFormData, KeeperEnum } from '../models/health'

export const useKeepers = (currentKeeper: KeeperEnum) => {
    const {
        list: res,
        loading: listLoading,
        error: listError,
        run: getList
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
    } = useRequest(
        (formData: HealthFormData) => sarairRequest.post('keepers', formData),
        { manual: true, onSuccess: () => getList() }
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
