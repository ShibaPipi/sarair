import React, { forwardRef } from 'react'
import styled from '@emotion/styled'

import { useDebounce, useMemoizedFn } from '@sarair/shared/hooks'
import { useBoardDelete } from '../../../hooks/boards'
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
    Drag,
    Drop,
    DropChild,
    Dropdown,
    Menu,
    MenuItem,
    SarairRow
} from '@sarair/desktop/shared/ui'
import { ColumnContainer } from './ColumnContainer'
import { CreateTask } from './CreateTask'
import { TaskTypeIcon } from './TaskTypeIcon'

import type { Board } from '../../../types'

interface BoardColumnProps {
    board: Board
}

export const BoardColumn: React.FC<BoardColumnProps> = forwardRef<
    HTMLDivElement,
    BoardColumnProps
>(({ board, ...props }, ref) => {
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
        <ColumnContainer ref={ref} {...props}>
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
                <Drop
                    type="ROW"
                    direction="vertical"
                    droppableId={`${board.id}task`}
                >
                    {/* A min height makes droppable when some column is empty. */}
                    <DropChild style={{ minHeight: 5 }}>
                        {tasks?.map(({ id, name, typeId }, index) => (
                            <Drag
                                key={id}
                                index={index}
                                draggableId={`${board.id}task${id}`}
                            >
                                {/* Either a div element wrapper or a forwardRef component can transmit the prop ref of react-beautiful-dnd. */}
                                <div>
                                    <TaskCard onClick={() => show(id)}>
                                        <p>
                                            <MarkText
                                                name={name}
                                                keyword={params.name}
                                            />
                                        </p>
                                        <TaskTypeIcon id={typeId} />
                                    </TaskCard>
                                </div>
                            </Drag>
                        ))}
                    </DropChild>
                </Drop>
                <CreateTask boardId={board.id} />
            </TasksContainer>
        </ColumnContainer>
    )
})

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
