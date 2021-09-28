import React from 'react'

import type { Param, User } from '../index'

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
    <form action="">
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
        <select
          value={param.personId}
          onChange={(e) => setParam({ ...param, personId: e.target.value })}
        >
          <option value="">负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}
