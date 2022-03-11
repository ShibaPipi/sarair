import { useMemo } from 'react'

import {
    useDeleteQueryConfig,
    useDetailQuery,
    useMutation,
    useUpdateQueryConfig
} from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { TASK_CACHE_KEY, useTaskListQueryKey } from '.'

import type { Task } from '../../types'

export const useTaskDetail = (id: number) => {
    const queryKey = useTaskListQueryKey()
    const url = useMemo(() => `tasks/${id}`, [id])

    const { detail, isLoading } = useDetailQuery([TASK_CACHE_KEY, { id }], () =>
        sarairRequest.get<Task>(url)
    )

    const { isLoading: isUpdateLoading, mutateAsync: update } = useMutation(
        (formData: Partial<Task>) => sarairRequest.patch(url, formData),
        useUpdateQueryConfig(queryKey)
    )

    const { mutateAsync: remove } = useMutation(
        ({ id }: { id: number }) => sarairRequest.delete(`tasks/${id}`),
        useDeleteQueryConfig(queryKey)
    )

    return {
        detail,
        isLoading,
        isUpdateLoading,
        methods: { update, remove }
    }
}
