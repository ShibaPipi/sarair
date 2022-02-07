import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

import { useAuth } from '@sarair/shared/context'

import { Button, Dropdown, Menu, SarairRow } from '@sarair/desktop/shared/ui'

import { ReactComponent as SoftwareLogo } from '../../../assets/software-logo.svg'

export const Header: React.FC = () => {
    const {
        user,
        methods: { logout }
    } = useAuth()

    return (
        <HeaderWrapper between>
            <HeaderLeft gap>
                <Link to="/">
                    <SoftwareLogo width="18rem" color={'rgb(38, 132, 255)'} />
                </Link>
                <h2>项目</h2>
                <h2>用户</h2>
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
