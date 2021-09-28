import styles from './app.module.css'

import { ReactComponent as Logo } from './logo.svg'

import { ProjectListScreen } from '../screens/project-list'
import { LoginScreen } from '../screens/login'

export function App() {
  return (
    <div className={styles.app}>
      <header className="flex">
        <Logo width="75" height="75" />
        <h1>Welcome to jira!</h1>
      </header>
      <main>
        <LoginScreen />
        <ProjectListScreen />
        <h2>Next Steps</h2>
        <p>Here are some things you can do with Nx.</p>
        <details open>
          <summary>Add UI library</summary>
          <pre>{`# Generate UI lib
nx g @nrwl/react:lib ui

# Add a component
nx g @nrwl/react:component xyz --project ui`}</pre>
        </details>
        <details>
          <summary>View dependency graph</summary>
          <pre>{`nx dep-graph`}</pre>
        </details>
        <details>
          <summary>Run affected commands</summary>
          <pre>{`# see what's been affected by changes
nx affected:dep-graph

# run tests for current changes
nx affected:test

# run e2e tests for current changes
nx affected:e2e
  `}</pre>
        </details>
      </main>
    </div>
  )
}

export default App
