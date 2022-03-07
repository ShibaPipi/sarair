import { useListQuery } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { useTaskListQueryKey } from './index'

import type { Task } from '../../types/task'

export const useTaskList = (params?: Partial<Task>) => {
    const queryKey = useTaskListQueryKey()

    const { list, isLoading, error } = useListQuery(queryKey, () =>
        sarairRequest.get<Task[]>('tasks', params)
    )

    return {
        list,
        isLoading,
        error
    }
}
