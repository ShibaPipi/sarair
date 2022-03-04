import React from 'react'

import { useDocumentTitle } from '@sarair/shared/hooks'
import { useBoardList, useBoardSearchParams } from '../../hooks/boards'
import { useTaskList } from '../../hooks/tasks'
import { useProjectStore } from '../../hooks/projects'

import { PageContainer, Spin } from '@sarair/desktop/shared/ui'
import {
    BoardColumn,
    ColumnsWrapper,
    CreateBoard,
    SearchPanel,
    TaskModal
} from './components'

export const BoardScreen: React.FC = () => {
    useDocumentTitle('看板列表', true)

    const { projectId } = useBoardSearchParams()
    const { detail: project } = useProjectStore(projectId)
    const { list, isLoading } = useBoardList({ projectId })
    const { isLoading: isTaskListLoading } = useTaskList()

    return (
        <PageContainer>
            <h1>{project?.name}看板</h1>
            <SearchPanel />
            {isLoading || isTaskListLoading ? (
                <Spin size="large" />
            ) : (
                <ColumnsWrapper>
                    {list?.map(item => (
                        <BoardColumn key={item.id} board={item} />
                    ))}
                    <CreateBoard />
                </ColumnsWrapper>
            )}
            <TaskModal />
        </PageContainer>
    )
}
