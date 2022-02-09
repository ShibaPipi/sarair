import React from 'react'

import { Button, Drawer } from '@sarair/desktop/shared/ui'

interface ProjectDrawerProps {
    visible: boolean
    onClose: () => void
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
    visible,
    onClose
}) => {
    return (
        <Drawer width="100%" visible={visible} onClose={onClose}>
            <h1>Project Modal</h1>
            <Button onClick={onClose}>关闭</Button>
        </Drawer>
    )
}
