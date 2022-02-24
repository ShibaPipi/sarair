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
    }, [getList, params])

    const manualOptions = { onSuccess: getList }
    const { loading: createLoading, runAsync: create } = useManualRequest(
        (params: Partial<Project>) => sarairRequest.post('projects', params),
        manualOptions
    )
    const { loading: updatePinLoading, runAsync: updatePin } = useManualRequest(
        (id: number, pin: boolean) =>
            sarairRequest.patch(`projects/${id}`, { pin }),
        manualOptions
    )

    return {
        list,
        loading: loading || createLoading || updatePinLoading,
        error,
        methods: {
            getList,
            create,
            updatePin
        }
    }
}
