import { FC, useMemo } from 'react'
import styled from '@emotion/styled'

import { useProjectDrawer, useProjectList } from '../../../hooks/projects'

import {
    ButtonNoPadding,
    Divider,
    List,
    ListItem,
    ListItemMeta,
    Popover,
    TypographyText
} from '@sarair/desktop/shared/ui'
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
                    <TypographyText type="secondary">收藏项目</TypographyText>
                    <List>
                        {pinnedProjects?.map(({ id, name }) => (
                            <ListItem key={id}>
                                <ListItemMeta title={name} />
                            </ListItem>
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
