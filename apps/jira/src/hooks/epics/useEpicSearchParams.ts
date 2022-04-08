import { useProjectIdInRouteParams } from '../projects'

export const useEpicSearchParams = () => ({
    projectId: useProjectIdInRouteParams()
})
