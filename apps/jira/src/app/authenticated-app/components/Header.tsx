import { FC } from 'react'
import styled from '@emotion/styled'

import { resetRoute } from '@sarair/shared/utils'
import { useAuth } from '../../../hooks/useAuth'

import { Button, Dropdown, Menu } from 'antd'
import { ButtonNoPadding, SarairRow } from '@sarair/desktop/shared/ui'
import { ProjectPopover } from './ProjectPopover'
import { UserPopover } from './UserPopover'

import { ReactComponent as SoftwareLogo } from '../../../assets/software-logo.svg'

export const Header: FC = () => {
    const {
        user,
        methods: { logout }
    } = useAuth()

    return (
        <HeaderWrapper between>
            <HeaderLeft gap>
                <ButtonNoPadding type="link" onClick={resetRoute}>
                    <SoftwareLogo width="18rem" color={'rgb(38, 132, 255)'} />
                </ButtonNoPadding>
                <ProjectPopover />
                <UserPopover />
            </HeaderLeft>
            <HeaderRight>
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key="logout">
                                <Button type="link" onClick={logout}>
                                    登出
                                </Button>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <Button
                        type={'link'}
                        onClick={event => event.preventDefault()}
                    >
                        Hi, {user?.name}
                    </Button>
                </Dropdown>
            </HeaderRight>
        </HeaderWrapper>
    )
}

const HeaderLeft = styled(SarairRow)``

const HeaderRight = styled.div``

const HeaderWrapper = styled(SarairRow)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`
