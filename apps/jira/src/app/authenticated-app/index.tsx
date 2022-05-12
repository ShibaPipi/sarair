import { FC } from 'react'
import {
    Route,
    BrowserRouter as Router,
    Routes,
    Navigate
} from 'react-router-dom'
import styled from '@emotion/styled'

import { ProjectListScreen } from '../../screens/project-list'
import { ProjectScreen } from '../../screens/project'

import { Header } from './components/Header'
import { ProjectDrawer } from './components/ProjectDrawer'

export const AuthenticatedApp: FC = () => {
    return (
        <Container>
            <Router>
                <Header />
                <Main>
                    <Routes>
                        <Route
                            path="/projects"
                            element={<ProjectListScreen />}
                        />
                        <Route
                            path="/projects/:id/*"
                            element={<ProjectScreen />}
                        />
                        <Route index element={<ProjectListScreen />} />
                    </Routes>
                </Main>
                <ProjectDrawer />
            </Router>
        </Container>
    )
}

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 */

const Main = styled.main`
    display: flex;
    overflow: hidden;
`

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    height: 100vh;
`

export default AuthenticatedApp
