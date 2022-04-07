import { useMemo } from 'react'
import dayjs from 'dayjs'
import { max, min, pluck, reduce, sort } from 'ramda'

import {
    useCreateQueryConfig,
    useListQuery,
    useMutation
} from '@sarair/shared/hooks'
import request from '../../request'
import { useHealthListQueryKey } from './useHealthListQueryKey'

import type { Health, HealthFormData } from '../../models'

const uri = 'healths'

export const useHealthList = (params?: Partial<Health>) => {
    const queryKey = useHealthListQueryKey()

    const {
        list,
        isLoading,
        error: listError
    } = useListQuery(queryKey, () => request.get<Health[]>(uri, params))

    const {
        isLoading: isCreateLoading,
        error: createError,
        mutateAsync: create
    } = useMutation(
        (formData: HealthFormData) => request.post<Health>(uri, formData),
        useCreateQueryConfig(queryKey)
    )

    const lostWeight = useMemo(() => {
        const weights = pluck('weight', list)

        return (
            reduce<number, number>(max, 0, weights) -
            reduce<number, number>(min, weights[0], weights)
        ).toFixed(1)
    }, [list])

    return {
        list: sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(), list),
        lostWeight,
        isLoading,
        isCreateLoading,
        error: listError || createError,
        methods: { create }
    }
}
