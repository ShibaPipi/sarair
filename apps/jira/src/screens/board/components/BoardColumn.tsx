import React from 'react'
import styled from '@emotion/styled'

import { useDebounce } from '@sarair/shared/hooks'
import {
    useTaskList,
    useTaskModal,
    useTaskSearchParams
} from '../../../hooks/tasks'

import { MarkText } from '@sarair/shared/ui'
import { Card } from '@sarair/desktop/shared/ui'
import { ColumnContainer } from './ColumnContainer'
import { CreateTask } from './CreateTask'
import { TaskTypeIcon } from './TaskTypeIcon'

import type { Board } from '../../../types/board'

interface BoardColumnProps {
    board: Board
}

export const BoardColumn: React.FC<BoardColumnProps> = ({ board }) => {
    const [params] = useTaskSearchParams()
    const debouncedParams = useDebounce(params, { wait: 500 })
    const { list } = useTaskList(debouncedParams)

    const tasks = list?.filter(item => item.boardId === board.id)

    const {
        methods: { show }
    } = useTaskModal()

    return (
        <ColumnContainer>
            <h3>{board.name}</h3>
            <TasksContainer>
                {tasks?.map(({ id, name, typeId }) => (
                    <TaskCard key={id} onClick={() => show(id)}>
                        <MarkText name={name} keyword={params.name} />
                        <TaskTypeIcon id={typeId} />
                    </TaskCard>
                ))}
                <CreateTask boardId={board.id} />
            </TasksContainer>
        </ColumnContainer>
    )
}

const TaskCard = styled(Card)`
    margin-bottom: 0.5rem;
    cursor: pointer;
`

const TasksContainer = styled.div`
    overflow: scroll;
    flex: 1;

    ::-webkit-scrollbar {
        display: none;
    }
`
