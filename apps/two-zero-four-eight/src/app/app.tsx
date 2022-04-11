import { useState } from 'react'

import { useEventListener, useMemoizedFn, useMount } from '@sarair/shared/hooks'

import { Board } from './components/Board'
import { Panel } from './components/Panel'

export const App = () => {
    const [score, setScore] = useState(0)
    const [cellDigit, setCellDigit] = useState<number[][]>([[]])

    const handleNewGame = useMemoizedFn(() =>
        Promise.resolve()
            .then(resetBoard)
            .then(() => {
                randomNumber()
                randomNumber()
            })
    )
    useMount(() => {
        handleNewGame()
    })

    const onKeyDown = useMemoizedFn(
        ({ code }: { code: KeyboardEvent['code'] }) => {
            switch (code) {
                case 'ArrowLeft': // left
                    canMoveLeft() &&
                        Promise.resolve()
                            .then(() => handleMoveLeft())
                            .then(() => randomNumber())
                    break
                case 'ArrowUp': // up
                    canMoveUp() &&
                        Promise.resolve()
                            .then(() => handleMoveUp())
                            .then(() => randomNumber())
                    break
                case 'ArrowRight': // right
                    canMoveRight() &&
                        Promise.resolve()
                            .then(() => handleMoveRight())
                            .then(() => randomNumber())
                    break
                case 'ArrowDown': // down
                    canMoveDown() &&
                        Promise.resolve()
                            .then(() => handleMoveDown())
                            .then(() => randomNumber())
                    break
                default:
                    return
            }

            isGameOver()
        }
    )
    useEventListener('keydown', onKeyDown)

    const handleMoveLeft = useMemoizedFn(() => {
        for (let y = 0; y < 4; y++) {
            for (let x = 1; x < 4; x++) {
                if (0 !== cellDigit[y][x]) {
                    for (let m = 0; m < x; m++) {
                        if (0 === cellDigit[y][m] && canThroughLeft(y, m, x)) {
                            cellDigit[y][m] = cellDigit[y][x]
                            cellDigit[y][x] = 0
                        } else if (
                            cellDigit[y][m] === cellDigit[y][x] &&
                            canThroughLeft(y, m, x)
                        ) {
                            cellDigit[y][m] += cellDigit[y][x]
                            cellDigit[y][x] = 0
                        }
                    }
                }
            }
        }

        setCellDigit(cellDigit)
    })

    const handleMoveUp = useMemoizedFn(() => {
        for (let y = 1; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (0 !== cellDigit[y][x]) {
                    for (let n = 0; n < y; n++) {
                        if (0 === cellDigit[n][x] && canThroughUp(x, n, y)) {
                            cellDigit[n][x] = cellDigit[y][x]
                            cellDigit[y][x] = 0
                        } else if (
                            cellDigit[n][x] === cellDigit[y][x] &&
                            canThroughUp(x, n, y)
                        ) {
                            cellDigit[n][x] += cellDigit[y][x]
                            cellDigit[y][x] = 0
                        }
                    }
                }
            }
        }

        setCellDigit(cellDigit)
    })

    const handleMoveRight = useMemoizedFn(() => {
        for (let y = 0; y < 4; y++) {
            for (let x = 2; x >= 0; x--) {
                if (0 !== cellDigit[y][x]) {
                    for (let m = 3; m > x; m--) {
                        if (0 === cellDigit[y][m] && canThroughRight(y, m, x)) {
                            cellDigit[y][m] = cellDigit[y][x]
                            cellDigit[y][x] = 0
                        } else if (
                            cellDigit[y][m] === cellDigit[y][x] &&
                            canThroughRight(y, m, x)
                        ) {
                            cellDigit[y][m] += cellDigit[y][x]
                            cellDigit[y][x] = 0
                        }
                    }
                }
            }
        }

        setCellDigit(cellDigit)
    })

    const handleMoveDown = useMemoizedFn(() => {
        for (let y = 2; y >= 0; y--) {
            for (let x = 0; x < 4; x++) {
                if (0 !== cellDigit[y][x]) {
                    for (let n = 3; n > y; n--) {
                        if (0 === cellDigit[n][x] && canThroughDown(x, n, y)) {
                            cellDigit[n][x] = cellDigit[y][x]
                            cellDigit[y][x] = 0
                        } else if (
                            cellDigit[n][x] === cellDigit[y][x] &&
                            canThroughDown(x, n, y)
                        ) {
                            cellDigit[n][x] += cellDigit[y][x]
                            cellDigit[y][x] = 0
                        }
                    }
                }
            }
        }

        setCellDigit(cellDigit)
    })

    const canMoveLeft = useMemoizedFn(() =>
        cellDigit.some(valueArray =>
            valueArray.some(
                (value, x) =>
                    0 !== x &&
                    0 !== value &&
                    (0 === valueArray[x - 1] ||
                        valueArray[x - 1] === valueArray[x])
            )
        )
    )

    const canMoveUp = useMemoizedFn(() => {
        console.log('up')

        for (let x = 0; x < 4; x++) {
            for (let y = 1; y < 4; y++) {
                if (
                    0 !== cellDigit[y][x] &&
                    (0 === cellDigit[y - 1][x] ||
                        cellDigit[y - 1][x] === cellDigit[y][x])
                ) {
                    return true
                }
            }
        }

        return false
    })

    const canMoveRight = useMemoizedFn(() =>
        cellDigit.some(valueArray =>
            valueArray.some(
                (value: number, x: number) =>
                    3 !== x &&
                    0 !== value &&
                    (0 === valueArray[x + 1] ||
                        valueArray[x + 1] === valueArray[x])
            )
        )
    )

    const canMoveDown = useMemoizedFn(() => {
        for (let y = 2; y >= 0; y--) {
            for (let x = 0; x < 4; x++) {
                if (
                    0 !== cellDigit[y][x] &&
                    (0 === cellDigit[y + 1][x] ||
                        cellDigit[y + 1][x] === cellDigit[y][x])
                ) {
                    return true
                }
            }
        }

        return false
    })

    const canThroughLeft = useMemoizedFn((y: number, m: number, x: number) => {
        for (let i = m + 1; i < x; i++) {
            if (0 !== cellDigit[y][i]) {
                return false
            }
        }

        return true
    })

    const canThroughUp = useMemoizedFn((x: number, n: number, y: number) => {
        for (let j = n + 1; j < y; j++) {
            if (0 !== cellDigit[x][j]) {
                return false
            }
        }

        return true
    })

    const canThroughRight = useMemoizedFn((y: number, m: number, x: number) => {
        for (let i = m + 1; i < x; i++) {
            if (0 !== cellDigit[y][i]) {
                return false
            }
        }

        return true
    })

    const canThroughDown = useMemoizedFn((x: number, n: number, y: number) => {
        for (let j = n + 1; j < y; j++) {
            if (0 !== cellDigit[x][j]) {
                return false
            }
        }

        return true
    })

    const isGameOver = useMemoizedFn(() => void 0)

    const resetBoard = useMemoizedFn(() => {
        const prevData = [
            [8, 0, 2, 0],
            [4, 0, 16, 0],
            [4, 0, 2, 0],
            [4, 0, 0, 0]
        ]

        setScore(0)
        setCellDigit(prevData)
    })

    const randomNumber = useMemoizedFn(() => {
        if (!hasSpace()) {
            return
        }

        // 随机一个位置
        let x = randomCoordinate()
        let y = randomCoordinate()

        while (0 !== cellDigit[y][x]) {
            x = randomCoordinate()
            y = randomCoordinate()
        }
        // 随机一个数字，并显示这个数字
        cellDigit[y][x] = Math.random() > 0.5 ? 2 : 4

        setCellDigit(cellDigit)
    })

    const hasSpace = useMemoizedFn(() =>
        cellDigit.some(valueArray => valueArray.some(value => 0 === value))
    )

    const randomCoordinate = useMemoizedFn(() => Math.floor(Math.random() * 4))

    const initialize2DArray = useMemoizedFn((x: number, y: number, value = 0) =>
        Array(y)
            .fill(0)
            .map(() => Array(x).fill(value))
    )

    return (
        <div>
            <Panel score={score} onNewGame={handleNewGame} />
            {cellDigit && <Board cellDigit={cellDigit} />}
        </div>
    )
}

export default App
