import { FC } from 'react'
import styled from '@emotion/styled'

import { Countdown, HeartCanvas } from './components'

const App: FC = () => {
    return (
        <StyledApp>
            <Countdown />
            <HeartCanvas />
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
