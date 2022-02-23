import React from 'react'

import { useAuth } from '../hooks/useAuth'

import { ErrorBoundary } from '@sarair/shared/ui'
import { FullPageErrorCallback } from '@sarair/desktop/shared/ui'
import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'

export const App: React.FC = () => {
    const { user } = useAuth()

    return (
        <div className="App">
            <ErrorBoundary fallbackRender={FullPageErrorCallback}>
                {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </ErrorBoundary>
        </div>
    )
}
