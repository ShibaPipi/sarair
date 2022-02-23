import React, { useMemo } from 'react'
import styled from '@emotion/styled'

import { useProjectList } from '../../../hooks/useProjectList'
import { useProjectDrawer } from '../../../hooks/useProjectDrawer'

import {
    ButtonNoPadding,
    Divider,
    List,
    ListItem,
    ListItemMeta,
    Popover,
    TypographyText
} from '@sarair/desktop/shared/ui'

export const ProjectPopover: React.FC = () => {
    const {
        methods: { show }
    } = useProjectDrawer()

    const { list } = useProjectList()

    const pinnedProjects = useMemo(() => list.filter(item => item.pin), [list])

    return (
        <Popover
            placement="bottom"
            content={
                <ContentContainer>
                    <TypographyText type="secondary">收藏项目</TypographyText>
                    <List>
                        {pinnedProjects.map(({ id, name }) => (
                            <ListItem key={id}>
                                <ListItemMeta title={name} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <ButtonNoPadding type="link" onClick={show}>
                        创建项目
                    </ButtonNoPadding>
                </ContentContainer>
            }
        >
            <span>项目</span>
        </Popover>
    )
}

const ContentContainer = styled.div`
    min-width: 30rem;
`
