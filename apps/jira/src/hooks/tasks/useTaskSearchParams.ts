import { useUrlState } from '@sarair/shared/hooks'
import { useProjectIdInRouteParams } from '../projects'

export const useTaskSearchParams = () => {
    const projectId = useProjectIdInRouteParams()

    const [{ name, typeId, processorId, tagId }, setUrlState] = useUrlState({
        name: '',
        typeId: '',
        processorId: '',
        tagId: ''
    })

    return [
        {
            projectId,
            name,
            typeId: +typeId || undefined,
            processorId: +processorId || undefined,
            tagId: +tagId || undefined
        },
        setUrlState
    ] as const
}
