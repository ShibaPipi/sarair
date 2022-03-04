import { useMemoizedFn, useUrlState } from '@sarair/shared/hooks'
import { useTaskDetail } from './useTaskDetail'

export const useTaskModal = () => {
    const [{ editingTaskId }, setUrlState] = useUrlState({ editingTaskId: '' })

    const {
        detail,
        isLoading,
        isUpdateLoading,
        methods: { update }
    } = useTaskDetail(editingTaskId)

    const close = useMemoizedFn(() => setUrlState({ editingTaskId: undefined }))
    const show = useMemoizedFn((editingTaskId: number) =>
        setUrlState({ editingTaskId })
    )

    return {
        editingTaskId,
        detail,
        isLoading,
        isUpdateLoading,
        methods: {
            show,
            close,
            update
        }
    }
}
