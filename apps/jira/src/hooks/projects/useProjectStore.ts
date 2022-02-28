import { useMemo } from 'react'
import { useQueryClient } from 'react-query'

import { useDetailQuery, useMutation } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { PROJECT_CACHE_KEY, PROJECT_LIST_CACHE_KEY } from './'

import type { Project } from '../../types/project'

export const useProjectStore = (id?: number) => {
    const url = useMemo(() => `projects/${id}`, [id])

    const {
        detail,
        isLoading,
        error: detailError
    } = useDetailQuery(
        [PROJECT_CACHE_KEY, { id }],
        () => sarairRequest.get<Project>(url),
        { enabled: !!id }
    )

    const queryClient = useQueryClient()
    const mutationOptions = {
        onSuccess: () => queryClient.invalidateQueries(PROJECT_LIST_CACHE_KEY)
    }

    const {
        isLoading: isCreateLoading,
        error: createError,
        mutateAsync: create
    } = useMutation(
        (params: Partial<Project>) => sarairRequest.post('projects', params),
        mutationOptions
    )

    const {
        isLoading: isUpdateLoading,
        error: updateError,
        mutateAsync: update
    } = useMutation(
        (formData: Partial<Project>) => sarairRequest.patch(url, formData),
        mutationOptions
    )

    return {
        isLoading: isLoading || isCreateLoading || isUpdateLoading,
        detail,
        error: detailError || createError || updateError,
        methods: { create, update }
    }
}
