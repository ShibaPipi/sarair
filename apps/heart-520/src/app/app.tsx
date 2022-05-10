import { FC } from 'react'
import styled from '@emotion/styled'

import { Countdown, HeartPage } from './components'
import { useTime } from '../api'

const App: FC = () => {
    const { timeup } = useTime()

    return <StyledApp>{timeup ? <HeartPage /> : <Countdown />}</StyledApp>
}

const StyledApp = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default App
