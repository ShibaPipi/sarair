import { FC, lazy, Suspense } from 'react'

import { useAuth } from '../hooks/useAuth'

import { ErrorBoundary, FullPage } from '@sarair/shared/ui'
import { FullPageErrorCallback, Spin } from '@sarair/desktop/shared/ui'

const AuthenticatedApp = lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'))

export const App: FC = () => {
    const { user } = useAuth()

    return (
        <div className="App">
            <ErrorBoundary fallbackRender={FullPageErrorCallback}>
                <Suspense
                    fallback={
                        <FullPage>
                            <Spin spinning />
                        </FullPage>
                    }
                >
                    {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}
