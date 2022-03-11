import { useCreateQueryConfig, useMutation } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { useTaskListQueryKey } from '.'

import type { Task } from '../../types'

export const useTaskCreate = () => {
    const queryKey = useTaskListQueryKey()

    const { isLoading, mutateAsync: create } = useMutation(
        (params?: Partial<Task>) => sarairRequest.post('tasks', params),
        useCreateQueryConfig(queryKey)
    )

    return {
        isLoading,
        methods: { create }
    }
}
