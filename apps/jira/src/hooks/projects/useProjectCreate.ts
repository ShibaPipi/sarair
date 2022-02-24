import { useManualRequest } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'

import type { Project } from '../../types/project'

export const useProjectCreate = () => {
    const {
        loading,
        error,
        runAsync: create
    } = useManualRequest((params: Partial<Project>) =>
        sarairRequest.post('projects', params)
    )

    return {
        loading,
        error,
        methods: { create }
    }
}
