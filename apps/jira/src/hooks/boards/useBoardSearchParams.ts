import { useProjectIdInRouteParams } from '../projects'

export const useBoardSearchParams = () => ({
    projectId: useProjectIdInRouteParams()
})
