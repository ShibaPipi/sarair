import { useMemo } from 'react'

import {
    useDeleteQueryConfig,
    useListQuery,
    useMutation,
    useUpdateQueryConfig
} from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { PROJECT_LIST_CACHE_KEY } from '.'

import type { Project } from '../../types/project'

export const useProjectList = (params?: Partial<Project>) => {
    const queryKey = useMemo(() => [PROJECT_LIST_CACHE_KEY, params], [params])

    const { isLoading, error, list } = useListQuery(queryKey, () =>
        sarairRequest.get<Project[]>('projects', params)
    )

    const { mutateAsync: updatePin } = useMutation(
        (params: Partial<Project>) =>
            sarairRequest.patch(`projects/${params.id}`, params),
        useUpdateQueryConfig(queryKey)
    )

    const { mutateAsync: remove } = useMutation(
        ({ id }: { id: number }) => sarairRequest.delete(`projects/${id}`),
        useDeleteQueryConfig(queryKey)
    )

    return {
        list,
        isLoading,
        error,
        methods: {
            updatePin,
            remove
        }
    }
}
