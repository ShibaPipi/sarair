import { useMemo } from 'react'

import {
    useDetailQuery,
    useMutation,
    useUpdateQueryConfig
} from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { TASK_CACHE_KEY, useTaskListQueryKey } from '.'

import type { Task } from '../../types/task'

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

    return {
        detail,
        isLoading,
        isUpdateLoading,
        methods: { update }
    }
}
