import React from 'react'

import type { Project } from '../index'
import type { User } from '@sarair/shared/context'

import { ColumnProps, Table } from '@sarair/shared/ui'

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
      title: '负责人',
      render: (_, record) => (
        <span>
          {users.find((user) => user.id === record.personId)?.name || '未知'}
        </span>
      )
    }
  ]

  return <Table columns={columns} dataSource={list} pagination={false} />
}
