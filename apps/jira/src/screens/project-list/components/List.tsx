import React from 'react'

import type { Project } from '../index'
import type { User } from '@sarair/shared/context'

import { ColumnProps, Table } from '@sarair/shared/ui'
import dayjs from 'dayjs'

interface ListProps {
  list: Array<Project>
  users: Array<User>
}

export const List: React.FC<ListProps> = ({ list, users }) => {
  const columns: ColumnProps<Project>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      sorter: (a: Project, b: Project) => a.name.localeCompare(b.name)
    },
    {
      title: '部门',
      dataIndex: 'organization'
    },
    {
      title: '负责人',
      dataIndex: 'personId',
      render: (personId: Project['personId']) => (
        <span>
          {users.find((user) => user.id === personId)?.name || '未知'}
        </span>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      render: (created: Project['created']) =>
        created ? dayjs(created).format('YYYY-MM-DD') : '无'
    }
  ]

  return (
    <Table
      columns={columns}
      dataSource={list}
      pagination={false}
      rowKey={(r) => r.id}
    />
  )
}
