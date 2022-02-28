import { useQueryClient } from 'react-query'

import { useListQuery, useMutation } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { PROJECT_LIST_CACHE_KEY } from '.'

import type { Project } from '../../types/project'

export const useProjectList = (params?: Partial<Project>) => {
    const queryClient = useQueryClient()
    const mutationOptions = {
        onSuccess: () => queryClient.invalidateQueries(PROJECT_LIST_CACHE_KEY)
    }

    const { isLoading, error, list } = useListQuery(
        [PROJECT_LIST_CACHE_KEY, params],
        () => sarairRequest.get<Project[]>('projects', params)
    )

    const { isLoading: isUpdatePinLoading, mutateAsync: updatePin } =
        useMutation(
            (params: Partial<Project>) =>
                sarairRequest.patch(`projects/${params.id}`, params),
            mutationOptions
        )

    const { isLoading: isRemoveLoading, mutateAsync: remove } = useMutation(
        (id: number) => sarairRequest.delete(`projects/${id}`),
        mutationOptions
    )

    return {
        list,
        isLoading: isLoading || isUpdatePinLoading || isRemoveLoading,
        error,
        methods: {
            updatePin,
            remove
        }
    }
}
