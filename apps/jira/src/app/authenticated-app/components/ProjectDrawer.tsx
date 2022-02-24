import React from 'react'

import { useProjectDrawer } from '../../../hooks/projects'

import { Button, Drawer } from '@sarair/desktop/shared/ui'

export const ProjectDrawer: React.FC = () => {
    const {
        visible,
        methods: { close }
    } = useProjectDrawer()

    return (
        <Drawer width="100%" visible={visible} onClose={close}>
            <h1>Project Modal</h1>
            <Button onClick={close}>关闭</Button>
        </Drawer>
    )
}
