import { FC } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useTitle, useMemoizedFn } from 'ahooks'

import { useBoardList, useBoardSearchParams } from '../../hooks/boards'
import { useTaskList } from '../../hooks/tasks'
import { useProjectStore } from '../../hooks/projects'

import { Spin } from 'antd'
import { Drag, Drop, DropChild, PageContainer } from '@sarair/desktop/shared/ui'
import {
    BoardColumn,
    ColumnsWrapper,
    CreateBoard,
    SearchPanel,
    TaskModal
} from './components'

export const BoardScreen: FC = () => {
    useTitle('看板列表', { restoreOnUnmount: true })

    const { projectId } = useBoardSearchParams()
    const { detail: project } = useProjectStore(projectId)
    const {
        list: boardList,
        isLoading,
        methods: { reorder: reorderBoard }
    } = useBoardList({ projectId })
    const {
        isLoading: isTaskListLoading,
        list: taskList,
        methods: { reorder: reorderTask }
    } = useTaskList()

    const handleDragEnd = useMemoizedFn(
        ({ source, destination, type }: DropResult) => {
            if (!destination) return

            if (type === 'COLUMN') {
                const fromId = boardList?.[source.index].id
                const toId = boardList?.[destination.index].id
                if (!fromId || !toId || fromId === toId) return

                const type =
                    destination.index > source.index ? 'after' : 'before'
                reorderBoard({ fromId, referenceId: toId, type })
            }

            if (type === 'ROW') {
                const fromBoardId = +source.droppableId
                const toBoardId = +destination.droppableId
                if (fromBoardId === toBoardId) return

                const fromTaskId = taskList.filter(
                    item => item.boardId === fromBoardId
                )[source.index]?.id
                const toTaskId = taskList.filter(
                    item => item.boardId === toBoardId
                )[destination.index]?.id
                if (fromTaskId === toTaskId) return

                const type =
                    destination.index > source.index ? 'after' : 'before'
                reorderTask({
                    fromId: fromTaskId,
                    referenceId: toTaskId,
                    fromBoardId,
                    toBoardId,
                    type
                })
            }
        }
    )
    // const handleDragEnd = useMemoizedFn(() => {
    //     infoMessage('Developing feature, please be patient.')
    // })

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <PageContainer>
                <h1>{project?.name}看板</h1>
                <SearchPanel />
                {isLoading || isTaskListLoading ? (
                    <Spin size="large" />
                ) : (
                    <ColumnsWrapper>
                        <Drop
                            type="COLUMN"
                            direction="horizontal"
                            droppableId="board"
                        >
                            <DropChild style={{ display: 'flex' }}>
                                {boardList?.map((item, index) => (
                                    <Drag
                                        key={item.id}
                                        draggableId={`board${item.id}`}
                                        index={index}
                                    >
                                        {/*either a div element wrapper or a forwardRef component can transmit the prop ref of react-beautiful-dnd*/}
                                        <BoardColumn board={item} />
                                    </Drag>
                                ))}
                            </DropChild>
                        </Drop>
                        <CreateBoard />
                    </ColumnsWrapper>
                )}
                <TaskModal />
            </PageContainer>
        </DragDropContext>
    )
}
