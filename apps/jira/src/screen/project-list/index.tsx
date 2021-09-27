import React, { useEffect, useState } from 'react'

import { sarairRequest } from '@sarair/common/request'

import { SearchPanel } from './components/SearchPanel'
import { List } from './components/List'

export interface User {
  id: number
  name: string
}

export interface Project {
  id: number
  name: string
  personId: number
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

  const [list, setList] = useState<Project[]>([])

  useEffect(() => {
    sarairRequest
      .get<Project[]>(`projects?name=${param.name}&personId=${param.personId}`)
      .then(setList)
  }, [param.name, param.personId])

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    sarairRequest.get<User[]>('users').then(setUsers)
  }, [])

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  )
}
