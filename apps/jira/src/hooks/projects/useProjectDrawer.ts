import { useMemoizedFn, useUrlState } from '@sarair/shared/hooks'
import { useProjectStore } from './useProjectStore'

export const useProjectDrawer = () => {
    const [{ projectCreate, editId }, setUrlState] = useUrlState({
        editId: '',
        projectCreate: ''
    })
    const showCreate = useMemoizedFn(() => setUrlState({ projectCreate: true }))
    const close = useMemoizedFn(() => {
        setUrlState({ editId: undefined, projectCreate: undefined })
    })
    const showEdit = useMemoizedFn((id: number) => setUrlState({ editId: id }))

    const {
        isLoading,
        isMutateLoading,
        detail,
        error,
        methods: { create, update }
    } = useProjectStore(editId)

    return {
        visible: projectCreate === 'true' || !!editId,
        detail,
        isEditing: !!editId,
        isLoading,
        isMutateLoading,
        error,
        methods: {
            showCreate,
            showEdit,
            close,
            create,
            update
        }
    }
}
