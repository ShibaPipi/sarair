import { FC } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ErrorBoundary } from '@sarair/shared/ui'
import { FullPageErrorCallback } from '@sarair/desktop/shared/ui'
import { FeatureHealthList } from '../feature/healths'

const App: FC = () => {
    return (
        <div className="App">
            <ErrorBoundary fallbackRender={FullPageErrorCallback}>
                <Router>
                    <Routes>
                        <Route
                            path="/healths"
                            element={<FeatureHealthList />}
                        />
                        <Route index element={<FeatureHealthList />} />
                    </Routes>
                </Router>
            </ErrorBoundary>
        </div>
    )
}

export default App
