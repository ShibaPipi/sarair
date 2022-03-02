import { useMemo } from 'react'

import { useListQuery } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { TASK_LIST_CACHE_KEY } from './index'

import type { Task } from '../../types/task'

export const useTaskList = (params?: Partial<Task>) => {
    const queryKey = useMemo(() => [TASK_LIST_CACHE_KEY, params], [params])

    const { list, isLoading, error } = useListQuery(queryKey, () =>
        sarairRequest.get<Task[]>('tasks', params)
    )

    return {
        list,
        isLoading,
        error,
        methods: {}
    }
}
