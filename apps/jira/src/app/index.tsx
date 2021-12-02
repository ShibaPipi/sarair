import React from 'react'

import { useAuth } from '@sarair/shared/context'

import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'

export const App: React.FC = () => {
    const { user } = useAuth()

    return (
        <div className={'App'}>
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </div>
    )
}
