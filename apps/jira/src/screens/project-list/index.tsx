import React, { useEffect, useState } from 'react'

import { useDebounce, useDidMount } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { cleanObjectNilValue } from '@sarair/shared/utils'

import { SearchPanel } from './components/SearchPanel'
import { List } from './components/List'

import type { User } from '@sarair/shared/context'
import styled from '@emotion/styled'

export interface Project {
  id: string
  name: string
  personId: string
  organization: string
  created: number
}

export interface Param {
  name: string
  personId: string
}

export const ProjectListScreen: React.FC = () => {
  const [param, setParam] = useState<Param>({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce<Param>(param, 1000)
  const [list, setList] = useState<Project[]>([])
  useEffect(() => {
    sarairRequest
      .get<Project[]>('projects', cleanObjectNilValue(debouncedParam))
      .then(setList)
  }, [debouncedParam])

  const [users, setUsers] = useState<User[]>([])
  useDidMount(() => {
    sarairRequest.get<User[]>('users').then(setUsers)
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
