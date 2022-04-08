import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import {
    Button,
    List,
    ListItem,
    ListItemMeta,
    PageContainer,
    SarairRow
} from '@sarair/desktop/shared/ui'
import { useDocumentTitle } from '@sarair/shared/hooks'
import { useProjectStore } from '../../hooks/projects'
import { useEpicList, useEpicSearchParams } from '../../hooks/epics'
import { useTaskList } from '../../hooks/tasks'

export const EpicScreen = () => {
    useDocumentTitle('任务组列表', true)

    const { projectId } = useEpicSearchParams()
    const { detail } = useProjectStore(projectId)
    const {
        list: epicList,
        methods: { remove }
    } = useEpicList({ projectId })
    const { list: taskList } = useTaskList({ projectId })

    return (
        <PageContainer>
            <h1>{detail?.name}任务组</h1>
            <List
                dataSource={epicList}
                itemLayout="vertical"
                renderItem={({ id, name, startTime, endTime }) => (
                    <ListItem>
                        <ListItemMeta
                            title={
                                <SarairRow between>
                                    <span>{name}</span>
                                    <Button
                                        type="link"
                                        onClick={() => remove(id)}
                                    >
                                        删除
                                    </Button>
                                </SarairRow>
                            }
                            description={
                                <div>
                                    <div>
                                        开始时间：
                                        {dayjs(startTime).format('YYYY-MM-DD')}
                                    </div>
                                    <div>
                                        结束时间：
                                        {dayjs(endTime).format('YYYY-MM-DD')}
                                    </div>
                                </div>
                            }
                        />
                        <div>
                            {taskList
                                .filter(({ epicId }) => epicId === id)
                                .map(({ id, name }) => (
                                    <Link
                                        key={id}
                                        to={`/projects/${detail?.id}/board?editingTaskId=${id}`}
                                    >
                                        {name}
                                    </Link>
                                ))}
                        </div>
                    </ListItem>
                )}
            />
        </PageContainer>
    )
}
