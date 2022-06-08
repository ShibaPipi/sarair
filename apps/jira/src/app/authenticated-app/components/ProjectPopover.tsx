import { FC, useMemo } from 'react'

import { useProjectDrawer, useProjectList } from '../../../hooks/projects'

import { Divider, List, Popover, Typography } from 'antd'
import { ButtonNoPadding } from '@sarair/desktop/shared/ui'
import { PopoverContentContainer } from '../../../components'

export const ProjectPopover: FC = () => {
    const {
        methods: { showCreate }
    } = useProjectDrawer()

    const {
        list,
        methods: { refetch }
    } = useProjectList()

    const pinnedProjects = useMemo(() => list?.filter(item => item.pin), [list])

    return (
        <Popover
            placement="bottom"
            content={
                <PopoverContentContainer>
                    <Typography.Text type="secondary">收藏项目</Typography.Text>
                    <List>
                        {pinnedProjects?.map(({ id, name }) => (
                            <List.Item key={id}>
                                <List.Item.Meta title={name} />
                            </List.Item>
                        ))}
                    </List>
                    <Divider />
                    <ButtonNoPadding type="link" onClick={showCreate}>
                        创建项目
                    </ButtonNoPadding>
                </PopoverContentContainer>
            }
            onVisibleChange={() => refetch()}
        >
            <span>项目</span>
        </Popover>
    )
}
