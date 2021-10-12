import React from 'react'

import type { User } from '@sarair/shared/context'
import type { Param } from '../index'

import { Form, Input, Select } from '@sarair/shared/ui'

interface SearchPanelProps {
  param: Param
  setParam: (param: Param) => void
  users: User[]
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
  param,
  setParam,
  users
}) => {
  return (
    <Form layout={'inline'} style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          onChange={(e) => setParam({ ...param, name: e.target.value })}
          value={param.name}
          placeholder={'项目名'}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
