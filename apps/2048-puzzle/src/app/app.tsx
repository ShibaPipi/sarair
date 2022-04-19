import {
    useEventListener,
    useMount,
    useWhyDidYouUpdate
} from '@sarair/shared/hooks'

import { useData } from '../api/useData'

import { Board } from './components/Board'
import { Panel } from './components/Panel'
import { Test } from './components/Test'

export const App = () => {
    const {
        cellDigits,
        score,
        methods: { newGame, onKeyDown }
    } = useData()
    // useWhyDidYouUpdate('App', { cellDigits })
    // console.log(cellDigits)

    useMount(() => {
        newGame()
    })
    useEventListener('keydown', onKeyDown)

    return (
        <div>
            <Panel score={score} onNewGame={newGame} />
            {cellDigits && <Board cellDigits={cellDigits} />}
            {/* <Test /> */}
        </div>
    )
}

export default App
