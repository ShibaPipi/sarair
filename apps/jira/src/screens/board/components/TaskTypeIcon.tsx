import React, { useMemo } from 'react'

import { useTaskTypeList } from '../../../hooks/tasks'

import taskIcon from '../assets/task.svg'
import bugIcon from '../assets/bug.svg'

interface TaskTypeIconProps {
    id: number
}

export const TaskTypeIcon: React.FC<TaskTypeIconProps> = ({ id }) => {
    const { list } = useTaskTypeList()

    const name = useMemo(
        () => list?.find(item => item.id === id)?.name,
        [id, list]
    )

    return name ? (
        <img src={name === 'task' ? taskIcon : bugIcon} alt="task-icon" />
    ) : null
}
