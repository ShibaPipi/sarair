import React from 'react'
import styled from '@emotion/styled'

import { useAuth } from '@sarair/shared/context'

import { ProjectListScreen } from '../screens/project-list'

import { SarairRow } from '@sarair/shared/ui'

export const AuthenticatedApp: React.FC = () => {
  const {
    methods: { logout }
  } = useAuth()

  return (
    <Container>
      <Header between>
        <HeaderLeft gap>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={() => logout()}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
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

const Main = styled.main``

const HeaderLeft = styled(SarairRow)``

const HeaderRight = styled.div``

const Header = styled(SarairRow)``

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
