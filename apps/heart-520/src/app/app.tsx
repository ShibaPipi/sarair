import { FC, lazy, Suspense } from 'react'
import styled from '@emotion/styled'

import { useDocumentTitle } from '@sarair/shared/hooks'
import { useTime } from '../api'

import { FullPage } from '@sarair/shared/ui'
import { Spin } from '@sarair/desktop/shared/ui'

const Countdown = lazy(() => import('./components/Countdown'))
const HeartPage = lazy(() => import('./components/HeartPage'))

const App: FC = () => {
    const { timeup } = useTime()
    useDocumentTitle('520 🥰🥰🥰', true)

    return (
        <StyledApp>
            <Suspense
                fallback={
                    <FullPage>
                        <Spin
                            indicator={
                                <span role="img" aria-label="稍等片刻...">
                                    稍等片刻😘😘😘
                                </span>
                            }
                            spinning
                        />
                    </FullPage>
                }
            >
                {timeup ? <HeartPage /> : <Countdown />}
            </Suspense>
        </StyledApp>
    )
}

const StyledApp = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default App
