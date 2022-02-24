import { useDetailRequest, useManualRequest } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { useMemo } from 'react'

import type { Project } from '../../types/project'

export const useProjectDetail = (id: number) => {
    const url = useMemo(() => `projects/${id}`, [id])

    const { detail, loading, error } = useDetailRequest(
        () => sarairRequest.get<Project>(url),
        { ready: !!id }
    )

    const { loading: updateLoading, runAsync: update } = useManualRequest(
        (formData: Partial<Project>) => sarairRequest.patch(url, formData)
    )

    return {
        loading: loading || updateLoading,
        detail,
        error,
        methods: { update }
    }
}
