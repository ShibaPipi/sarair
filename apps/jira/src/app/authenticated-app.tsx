import React from 'react'

import { useAuth } from '@sarair/shared/context'

import { ProjectListScreen } from '../screens/project-list'

export const AuthenticatedApp: React.FC = () => {
  const {
    methods: { logout }
  } = useAuth()

  return (
    <div>
      <button onClick={() => logout()}>登出</button>
      <ProjectListScreen />
    </div>
  )
}
