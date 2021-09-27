import React, { useEffect, useState } from 'react'
import qs from 'qs'

import { useDebounce, useDidMount } from '@sarair/common/hooks'
import { sarairRequest } from '@sarair/common/request'
import { cleanObjectNilValue } from '@sarair/common/utils'

import { SearchPanel } from './components/SearchPanel'
import { List } from './components/List'

export interface User {
  id: string
  name: string
}

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

export const ProjectListScreen = () => {
  const [param, setParam] = useState<Param>({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param, 1000)
  const [list, setList] = useState<Project[]>([])
  useEffect(() => {
    sarairRequest
      .get<Project[]>(
        `projects?${qs.stringify(cleanObjectNilValue(debouncedParam))}`
      )
      .then(setList)
  }, [debouncedParam])

  const [users, setUsers] = useState<User[]>([])
  useDidMount(() => {
    sarairRequest.get<User[]>('users').then(setUsers)
  })

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  )
}
