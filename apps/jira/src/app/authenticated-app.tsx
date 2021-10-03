import { ProjectListScreen } from './screens/project-list'

import { useAuth } from './context/auth'

export const AuthenticatedApp = () => {
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
