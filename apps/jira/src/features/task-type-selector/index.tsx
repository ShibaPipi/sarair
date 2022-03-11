import React, { ComponentProps } from 'react'

import { useTaskTypeList } from '../../hooks/tasks'

import { IdSelector } from '@sarair/desktop/shared/ui'

type TaskSelectorProps = ComponentProps<typeof IdSelector>

export const TaskTypeSelector: React.FC<TaskSelectorProps> = ({ ...props }) => {
    const { list } = useTaskTypeList()

    return <IdSelector options={list} {...props} />
}
