import { useMemo } from 'react'

import {
    useCreateQueryConfig,
    useDetailQuery,
    useMutation,
    useUpdateQueryConfig
} from '@sarair/shared/hooks/react-query'
import { sarairRequest } from '@sarair/shared/request'
import {
    PROJECT_CACHE_KEY,
    PROJECT_LIST_CACHE_KEY,
    useProjectSearchParams
} from './'

import type { Project } from '../../types'

export const useProjectStore = (id?: number) => {
    const [params] = useProjectSearchParams()
    const queryKey = useMemo(() => [PROJECT_LIST_CACHE_KEY, params], [params])
    const url = useMemo(() => `projects/${id}`, [id])

    const { detail, isLoading, error } = useDetailQuery(
        [PROJECT_CACHE_KEY, { id }],
        () => sarairRequest.get<Project>(url),
        { enabled: !!id }
    )

    const { isLoading: isCreateLoading, mutateAsync: create } = useMutation(
        (params: Partial<Project>) => sarairRequest.post('projects', params),
        useCreateQueryConfig(queryKey)
    )

    const { isLoading: isUpdateLoading, mutateAsync: update } = useMutation(
        (formData: Partial<Project>) => sarairRequest.patch(url, formData),
        useUpdateQueryConfig(queryKey)
    )

    return {
        isLoading: isLoading,
        isMutateLoading: isCreateLoading || isUpdateLoading,
        detail,
        error,
        methods: { create, update }
    }
}
