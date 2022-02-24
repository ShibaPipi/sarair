import { useMemo } from 'react'

import { useMemoizedFn, useUrlState } from '@sarair/shared/hooks'
import { useProjectDetail } from './useProjectDetail'
import { useProjectCreate } from './useProjectCreate'

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
        loading,
        error,
        methods: { create }
    } = useProjectCreate()
    const {
        loading: updateLoading,
        detail,
        error: updateError,
        methods: { update }
    } = useProjectDetail(editId)

    return {
        visible: projectCreate === 'true' || !!editId,
        detail,
        isEditing: !!editId,
        loading: loading || updateLoading,
        error: error || updateError,
        methods: {
            showCreate,
            showEdit,
            close,
            create,
            update
        }
    }
}
