import { FC } from 'react'
import styled from '@emotion/styled'

import { useDocumentTitle } from '@sarair/shared/hooks'

import { Countdown, HeartPage } from './components'
import { useTime } from '../api'

const App: FC = () => {
    const { timeup } = useTime()
    useDocumentTitle('520 🥰🥰🥰', true)

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
