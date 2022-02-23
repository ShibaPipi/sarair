import { useMemoizedFn, useUrlState } from '@sarair/shared/hooks'
import { useProjectDetail } from './useProjectDetail'

export const useProjectDrawer = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlState({
        projectCreate: ''
    })
    const [{ editId }, setEditId] = useUrlState({
        editId: ''
    })
    const show = useMemoizedFn(() => setProjectCreate({ projectCreate: true }))
    const close = useMemoizedFn(() => {
        setProjectCreate({ projectCreate: undefined })
        setEditId({ editId: undefined })
    })
    const handleEdit = useMemoizedFn((id: number) => setEditId({ editId: id }))

    const { loading, data: project } = useProjectDetail(editId)

    return {
        visible: projectCreate === 'true',
        project,
        loading,
        methods: {
            show,
            close,
            handleEdit
        }
    }
}
