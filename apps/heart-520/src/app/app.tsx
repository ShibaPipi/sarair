import { FC, lazy, Suspense } from 'react'
import { useTitle } from 'ahooks'
import styled from '@emotion/styled'

import { useTime } from '../api'

import { Spin } from 'antd'
import { FullPage } from '@sarair/shared/ui'

const Countdown = lazy(() => import('./components/Countdown'))
const HeartPage = lazy(() => import('./components/HeartPage'))

const App: FC = () => {
    const { timeup } = useTime()
    useTitle('520 🥰🥰🥰', { restoreOnUnmount: true })

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
