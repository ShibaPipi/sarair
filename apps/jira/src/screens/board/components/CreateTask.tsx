import { FC, useEffect, useState } from 'react'

import { useMemoizedFn } from '@sarair/shared/hooks'
import { useProjectIdInRouteParams } from '../../../hooks/projects'
import { useTaskCreate } from '../../../hooks/tasks'

import { Card, Input } from '@sarair/desktop/shared/ui'

interface CreateTaskProps {
    boardId: number
}

export const CreateTask: FC<CreateTaskProps> = ({ boardId }) => {
    const projectId = useProjectIdInRouteParams()

    const [name, setName] = useState('')

    const [inputMode, setInputMode] = useState(false)
    useEffect(() => {
        !inputMode && setName('')
    }, [inputMode])

    const {
        methods: { create }
    } = useTaskCreate()
    const toggleInputMode = useMemoizedFn(() => setInputMode(!inputMode))
    const handleSubmit = useMemoizedFn(() => {
        create({
            projectId,
            name,
            boardId,
            typeId: Math.random() > 0.5 ? 1 : 2
        }).then(() => {
            setName('')
            setInputMode(false)
        })
    })

    return inputMode ? (
        <Card>
            <Input
                onBlur={toggleInputMode}
                placeholder="需要做些什么"
                autoFocus
                onPressEnter={handleSubmit}
                value={name}
                onChange={({ target: { value } }) => setName(value)}
            />
        </Card>
    ) : (
        <div onClick={toggleInputMode}>+创建事务</div>
    )
}
