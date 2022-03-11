import { useListQuery, useMutation } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { useTaskListQueryKey, useTaskReorderConfig } from '.'

import type { SortProps, Task } from '../../types'

export const useTaskList = (params?: Partial<Task>) => {
    const queryKey = useTaskListQueryKey()

    const { list, isLoading, error } = useListQuery(queryKey, () =>
        sarairRequest.get<Task[]>('tasks', params)
    )

    const { mutateAsync: reorder } = useMutation(
        (params: SortProps) => sarairRequest.post('tasks/reorder', params),
        useTaskReorderConfig(queryKey)
    )

    return {
        list,
        isLoading,
        error,
        methods: { reorder }
    }
}
