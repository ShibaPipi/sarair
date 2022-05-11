import { useState } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import { useDocumentTitle } from '@sarair/shared/hooks'
import { useProjectStore } from '../../hooks/projects'
import { useEpicList, useEpicSearchParams } from '../../hooks/epics'
import { useTaskList } from '../../hooks/tasks'

import {
    Button,
    List,
    ListItem,
    ListItemMeta,
    PageContainer,
    SarairRow
} from '@sarair/desktop/shared/ui'
import { CreateEpic } from './components/CreateEpic'

export const EpicScreen = () => {
    useDocumentTitle('任务组列表', true)

    const { projectId } = useEpicSearchParams()
    const { detail } = useProjectStore(projectId)
    const {
        list: epicList,
        methods: { remove }
    } = useEpicList({ projectId })
    const { list: taskList } = useTaskList({ projectId })

    const [createDrawerVisible, setCreateDrawerVisible] =
        useState<boolean>(false)

    return (
        <PageContainer>
            <SarairRow between>
                <h1>{detail?.name}任务组</h1>
                <Button onClick={() => setCreateDrawerVisible(true)}>
                    创建任务组
                </Button>
            </SarairRow>
            <List
                dataSource={epicList}
                itemLayout="vertical"
                style={{ overflow: 'scroll' }}
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
            <CreateEpic
                visible={createDrawerVisible}
                onClose={() => setCreateDrawerVisible(false)}
            />
        </PageContainer>
    )
}
