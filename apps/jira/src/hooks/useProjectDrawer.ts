import { useMemoizedFn, useUrlState } from '@sarair/shared/hooks'

export const useProjectDrawer = () => {
    const [{ projectCreate }, showProjectDrawer] = useUrlState({
        projectCreate: ''
    })

    const show = useMemoizedFn(() => showProjectDrawer({ projectCreate: true }))
    const close = useMemoizedFn(() =>
        showProjectDrawer({ projectCreate: undefined })
    )

    return {
        visible: projectCreate === 'true',
        methods: {
            show,
            close
        }
    }
}
