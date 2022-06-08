import { FC, useMemo } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'

import { Menu } from 'antd'

import { BoardScreen } from '../board'
import { EpicScreen } from '../epic'

export const ProjectScreen: FC = () => {
    const { pathname } = useLocation()
    const selectedKey = useMemo(() => {
        const units = pathname.split('/')
        return units[3] || 'board'
    }, [pathname])

    return (
        <Container>
            <Aside>
                <Menu mode="inline" selectedKeys={[selectedKey]}>
                    <Menu.Item key="board">
                        <Link to="board">看板</Link>
                    </Menu.Item>
                    <Menu.Item key="epic">
                        <Link to="epic">任务组</Link>
                    </Menu.Item>
                </Menu>
            </Aside>
            <Main>
                <Routes>
                    <Route path="/board" element={<BoardScreen />} />
                    <Route path="/epic" element={<EpicScreen />} />
                    <Route index element={<BoardScreen />} />
                </Routes>
            </Main>
        </Container>
    )
}

const Aside = styled.aside`
    background-color: rgb(244, 245, 247);
    display: flex;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
    width: 100%;
`

const Main = styled.div`
    box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
    display: flex;
    overflow: hidden;
`
