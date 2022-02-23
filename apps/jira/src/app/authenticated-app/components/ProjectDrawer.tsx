import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useMemoizedFn } from '@sarair/shared/hooks'
import {
    hideProjectDrawer,
    selectProjectDrawerVisible
} from '../../../store/project.slice'

import { Button, Drawer } from '@sarair/desktop/shared/ui'

export const ProjectDrawer: React.FC = () => {
    const dispatch = useDispatch()

    const visible = useSelector(selectProjectDrawerVisible)

    const handleClose = useMemoizedFn(() => dispatch(hideProjectDrawer()))

    return (
        <Drawer width="100%" visible={visible} onClose={handleClose}>
            <h1>Project Modal</h1>
            <Button onClick={handleClose}>关闭</Button>
        </Drawer>
    )
}
