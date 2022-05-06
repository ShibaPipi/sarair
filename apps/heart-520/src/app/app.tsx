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

const StyledApp = styled.div``

export default App
