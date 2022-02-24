import { useEffect } from 'react'

import { useListRequest, useManualRequest } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'

import type { Project } from '../../types/project'

export const useProjectList = (params?: Partial<Project>) => {
    const { list, loading, error, getList } = useListRequest(() =>
        sarairRequest.get<Project[]>('projects', params)
    )
    useEffect(() => {
        getList()
    }, [getList, params?.name, params?.personId])

    const manualOptions = { onSuccess: getList }
    const { loading: updatePinLoading, runAsync: updatePin } = useManualRequest(
        (id: number, pin: boolean) =>
            sarairRequest.patch(`projects/${id}`, { pin }),
        manualOptions
    )
    const { loading: removeLoading, runAsync: remove } = useManualRequest(
        (id: number) => sarairRequest.delete(`projects/${id}`),
        manualOptions
    )

    return {
        list,
        loading: loading || updatePinLoading || removeLoading,
        error,
        methods: {
            getList,
            updatePin,
            remove
        }
    }
}
