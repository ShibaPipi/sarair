import { useMemo } from 'react'

import {
    useDeleteQueryConfig,
    useListQuery,
    useMutation,
    useUpdateQueryConfig
} from '@sarair/shared/hooks/react-query'
import { sarairRequest } from '@sarair/shared/request'
import { PROJECT_LIST_CACHE_KEY } from '.'

import type { Project } from '../../types'

// TODO: projects api 一直在多次请求，存在性能问题
export const useProjectList = (params?: Partial<Project>) => {
    const queryKey = useMemo(() => [PROJECT_LIST_CACHE_KEY, params], [params])

    const { isLoading, error, list, refetch } = useListQuery(queryKey, () =>
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
            refetch,
            updatePin,
            remove
        }
    }
}
