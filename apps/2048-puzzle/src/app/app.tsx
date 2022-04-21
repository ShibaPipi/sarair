import { useEffect } from 'react'

import {
    useEventListener,
    useMount,
    useWhyDidYouUpdate
} from '@sarair/shared/hooks'
import { useData } from '../api/useData'
import { intervalIsGameOver } from '../config'

import { Board } from './components/Board'
import { Panel } from './components/Panel'
import { Test } from './components/Test'

export const App = () => {
    const {
        cellDigits,
        score,
        isGameOver,
        methods: { newGame, onKeyDown, onTouchEnd, onTouchStart }
    } = useData()
    // useWhyDidYouUpdate('App', { cellDigits })
    // console.log(cellDigits)

    useMount(() => {
        newGame()
    })

    useEffect(() => {
        if (isGameOver) {
            setTimeout(() => alert('Game Over!'), intervalIsGameOver)
        }
    }, [isGameOver])

    // 监听手指滑动操作
    useEventListener('touchstart', onTouchStart)
    useEventListener('touchend', onTouchEnd)
    // 监听键盘操作
    useEventListener('keydown', onKeyDown)
    // 阻止 ios 手机浏览器 “橡皮筋” 行为
    useEventListener(
        'touchmove',
        e => {
            e.preventDefault()
        },
        { passive: false }
    )

    return (
        <div className="App">
            <Panel score={score} onNewGame={newGame} />
            {cellDigits && <Board cellDigits={cellDigits} />}
            {/* <Test /> */}
        </div>
    )
}

export default App
