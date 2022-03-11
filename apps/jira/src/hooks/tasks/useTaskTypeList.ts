import { useListQuery } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { TASK_TYPE_LIST_CACHE_KEY } from '.'

import type { TaskType } from '../../types'

export const useTaskTypeList = () => {
    const { list, isLoading, error } = useListQuery(
        [TASK_TYPE_LIST_CACHE_KEY],
        () => sarairRequest.get<TaskType[]>('taskTypes')
    )

    return {
        list,
        isLoading,
        error
    }
}
