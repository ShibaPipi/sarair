import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'

import { useProjectList } from '../../../hooks/useProjectList'
import { showProjectDrawer } from '../../../store/project.slice'

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
    const dispatch = useDispatch()

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
                    <ButtonNoPadding
                        type="link"
                        onClick={() => dispatch(showProjectDrawer())}
                    >
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
