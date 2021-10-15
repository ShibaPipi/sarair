import React, { useState } from 'react'
import styled from '@emotion/styled'

import { useDebounce } from '@sarair/shared/hooks'
import { useProjectList } from '../../hooks/useProjectList'
import { useUserList } from '../../hooks/useUserList'

import { Typography } from '@sarair/shared/ui'
import { SearchPanel } from './components/SearchPanel'
import { List } from './components/List'

import type { Param } from '../../types/project'

export const ProjectListScreen: React.FC = () => {
  const [param, setParam] = useState<Param>({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 500)
  const {
    isLoading: listLoading,
    data: list,
    error
  } = useProjectList(debouncedParam)

  const { isLoading: usersLoading, data: users } = useUserList()

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        dataSource={list || []}
        loading={listLoading || usersLoading}
        users={users || []}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
