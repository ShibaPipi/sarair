import React from 'react'
import styled from '@emotion/styled'

import { useDebounce, useMemoizedFn } from '@sarair/shared/hooks'
import {
    useTaskList,
    useTaskModal,
    useTaskSearchParams
} from '../../../hooks/tasks'

import { MarkText } from '@sarair/shared/ui'
import {
    Button,
    Card,
    confirmModal,
    Dropdown,
    Menu,
    MenuItem,
    SarairRow
} from '@sarair/desktop/shared/ui'
import { ColumnContainer } from './ColumnContainer'
import { CreateTask } from './CreateTask'
import { TaskTypeIcon } from './TaskTypeIcon'

import type { Board } from '../../../types/board'
import { useBoardDelete } from '../../../hooks/boards'

interface BoardColumnProps {
    board: Board
}

export const BoardColumn: React.FC<BoardColumnProps> = ({ board }) => {
    const [params] = useTaskSearchParams()
    const debouncedParams = useDebounce(params, { wait: 500 })
    const { list } = useTaskList(debouncedParams)

    const tasks = list?.filter(item => item.boardId === board.id)

    const {
        methods: { remove: removeBoard }
    } = useBoardDelete()
    const {
        methods: { show }
    } = useTaskModal()

    const handleDelete = useMemoizedFn((id: number) => {
        confirmModal({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除看板吗',
            onOk: () => removeBoard({ id })
        })
    })

    return (
        <ColumnContainer>
            <SarairRow between>
                <h3>{board.name}</h3>
                <Dropdown
                    overlay={
                        <Menu>
                            <MenuItem>
                                <Button
                                    type="link"
                                    onClick={() => handleDelete(board.id)}
                                >
                                    删除
                                </Button>
                            </MenuItem>
                        </Menu>
                    }
                >
                    <Button type="link">...</Button>
                </Dropdown>
            </SarairRow>
            <TasksContainer>
                {tasks?.map(({ id, name, typeId }) => (
                    <TaskCard key={id} onClick={() => show(id)}>
                        <p>
                            <MarkText name={name} keyword={params.name} />
                        </p>
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
