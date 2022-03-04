import { useMemo } from 'react'

import { TASK_LIST_CACHE_KEY } from '.'
import { useTaskSearchParams } from './useTaskSearchParams'

export const useTaskListQueryKey = () => {
    const [params] = useTaskSearchParams()

    return useMemo(() => [TASK_LIST_CACHE_KEY, params], [params])
}
