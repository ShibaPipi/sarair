import { clone } from 'ramda'

import {
    useEventListener,
    useMemoizedFn,
    useMount,
    useSetState,
    useThrottleFn,
    useWhyDidYouUpdate
} from '@sarair/shared/hooks'

import {
    animateDurationShift,
    initState,
    actionNewGameThrottleTime,
    actionShiftThrottleTime
} from '../config'
import { CellData, CellDigits } from '../models'
import { getRandomPos } from '../utils/position'
import {
    canShiftDown,
    canShiftLeft,
    canShiftRight,
    canShiftUp,
    noBlockHorizontally,
    noBlockVertically,
    noSpace
} from '../utils/shift'

import { Board } from './components/Board'
import { Panel } from './components/Panel'
import { Test } from './components/Test'

export const App = () => {
    const [{ score, cellDigits }, setData] = useSetState<{
        score: number
        cellDigits: CellDigits
    }>(initState())

    // useWhyDidYouUpdate('App', { cellDigits })
    console.log(cellDigits)
    const resetBoard = useMemoizedFn(async () => {
        setData(initState())

        /**
         * 调试用数据
         */
        // const prevData = [
        //     [2, 0, 4, 16],
        //     [0, 0, 0, 0],
        //     [4, 0, 0, 0],
        //     [16, 0, 0, 0]
        // ].map(row =>
        //     row.map(value => ({
        //         value,
        //         toRow: null,
        //         toCol: null,
        //         random: false
        //     }))
        // )

        // setData({ cellDigits: prevData })
    })

    const resetCellAnimation = useMemoizedFn(async () => {
        setData({
            cellDigits: cellDigits.map(row =>
                row.map(col => ({
                    ...col,
                    random: !!col.value
                }))
            )
        })
    })
    const randomOneNumber = useMemoizedFn(async () => {
        if (noSpace(cellDigits)) {
            return
        }
        // 重置数据的 random 属性
        await resetCellAnimation()
        // 随机一个位置
        let top = getRandomPos()
        let left = getRandomPos()
        // let top = 3
        // let left = 3

        while (cellDigits[top][left].value !== 0) {
            top = getRandomPos()
            left = getRandomPos()
        }

        // 随机一个数字，并显示这个数字
        cellDigits[top][left].value = Math.random() > 0.5 ? 2 : 4
        cellDigits[top][left].random = true

        setData({ cellDigits })
    })

    const { run: handleNewGame } = useThrottleFn(
        async () => {
            await resetBoard()
            await randomOneNumber()
            await randomOneNumber()
        },
        { wait: actionNewGameThrottleTime }
    )
    useMount(() => {
        handleNewGame()
    })

    const handleAfterShift = useMemoizedFn(
        (data: readonly [CellDigits, CellDigits]) => {
            const [digitsForAnimation, digitsForUpdate] = data

            setData({ cellDigits: digitsForAnimation })

            setTimeout(() => {
                setData(() => ({ cellDigits: digitsForUpdate }))
                randomOneNumber()
            }, animateDurationShift)
        }
    )
    const { run: onKeyDown } = useThrottleFn(
        async ({ code }: { code: KeyboardEvent['code'] }) => {
            switch (code) {
                case 'ArrowLeft':
                    if (canShiftLeft(cellDigits)) {
                        const newData = handleShiftLeft()
                        setTimeout(() => {
                            setData(() => ({ cellDigits: newData }))
                            randomOneNumber()
                        }, animateDurationShift)
                    }
                    break
                case 'ArrowRight':
                    if (canShiftRight(cellDigits)) {
                        const newData = handleShiftRight()
                        setTimeout(() => {
                            setData(() => ({ cellDigits: newData }))
                            randomOneNumber()
                        }, animateDurationShift)
                    }
                    break
                case 'ArrowUp':
                    if (canShiftUp(cellDigits)) {
                        const newData = handleShiftUp()
                        setTimeout(async () => {
                            setData(() => ({ cellDigits: newData }))
                            await randomOneNumber()
                        }, animateDurationShift)
                    }
                    break
                case 'ArrowDown':
                    if (canShiftDown(cellDigits)) {
                        const newData = handleShiftDown()
                        setTimeout(() => {
                            setData(() => ({ cellDigits: newData }))
                            randomOneNumber()
                        }, animateDurationShift)
                    }
                    break
                default:
                    return
            }

            isGameOver()
        },
        { wait: actionShiftThrottleTime }
    )
    useEventListener('keydown', onKeyDown)

    /**
     * 对数字左边的每一个位置都进行判断，是否能成为落脚点
     * 落脚位置是否为 0
     * 落脚位置数字和 value 是否相等
     * 移动路径上是否有障碍物
     */
    const handleShiftLeft = useMemoizedFn(() => {
        const digitsForAnimation = clone(cellDigits)

        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                if (cellDigits[i][j].value !== 0) {
                    for (let k = 0; k < j; k++) {
                        if (noBlockHorizontally(i, k, j, cellDigits)) {
                            if (cellDigits[i][k].value === 0) {
                                digitsForAnimation[i][j].toCol = k

                                cellDigits[i][k].value = cellDigits[i][j].value
                                cellDigits[i][j].value = 0

                                break
                            } else if (
                                cellDigits[i][k].value ===
                                cellDigits[i][j].value
                            ) {
                                digitsForAnimation[i][j].toCol = k

                                cellDigits[i][k].value =
                                    cellDigits[i][j].value +
                                    cellDigits[i][k].value
                                cellDigits[i][j].value = 0

                                break
                            }
                        }
                    }
                }
            }
        }

        setData({ cellDigits: digitsForAnimation })

        return cellDigits
    })

    /**
     * 对数字右边的每一个位置都进行判断，是否能成为落脚点
     * 落脚位置是否为 0
     * 落脚位置数字和 value 是否相等
     * 移动路径上是否有障碍物
     */
    const handleShiftRight = useMemoizedFn(() => {
        const digitsForAnimation = clone(cellDigits)

        for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                if (cellDigits[i][j].value !== 0) {
                    for (let k = 3; k > j; k--) {
                        if (noBlockHorizontally(i, j, k, cellDigits)) {
                            if (cellDigits[i][k].value === 0) {
                                digitsForAnimation[i][j].toCol = k

                                cellDigits[i][k].value = cellDigits[i][j].value
                                cellDigits[i][j].value = 0

                                break
                            } else if (
                                cellDigits[i][k].value ===
                                cellDigits[i][j].value
                            ) {
                                digitsForAnimation[i][j].toCol = k

                                cellDigits[i][k].value =
                                    cellDigits[i][j].value +
                                    cellDigits[i][k].value
                                cellDigits[i][j].value = 0

                                break
                            }
                        }
                    }
                }
            }
        }

        setData({ cellDigits: digitsForAnimation })

        return cellDigits
    })

    /**
     * 对数字上边的每一个位置都进行判断，是否能成为落脚点
     * 落脚位置是否为 0
     * 落脚位置数字和 value 是否相等
     * 移动路径上是否有障碍物
     */
    const handleShiftUp = useMemoizedFn(() => {
        const digitsForAnimation = clone(cellDigits)

        for (let j = 0; j < 4; j++) {
            for (let i = 1; i < 4; i++) {
                if (cellDigits[i][j].value !== 0) {
                    for (let k = 0; k < i; k++) {
                        if (noBlockVertically(j, k, i, cellDigits)) {
                            if (cellDigits[k][j].value === 0) {
                                digitsForAnimation[i][j].toRow = k

                                cellDigits[k][j].value = cellDigits[i][j].value
                                cellDigits[i][j].value = 0

                                break
                            } else if (
                                cellDigits[k][j].value ===
                                cellDigits[i][j].value
                            ) {
                                digitsForAnimation[i][j].toRow = k

                                cellDigits[k][j].value += cellDigits[i][j].value
                                cellDigits[i][j].value = 0

                                break
                            }
                        }
                    }
                }
            }
        }

        setData({ cellDigits: digitsForAnimation })

        return cellDigits
    })

    /**
     * 对数字下边的每一个位置都进行判断，是否能成为落脚点
     * 落脚位置是否为 0
     * 落脚位置数字和 value 是否相等
     * 移动路径上是否有障碍物
     */
    const handleShiftDown = useMemoizedFn(() => {
        const digitsForAnimation = clone(cellDigits)

        for (let j = 0; j < 4; j++) {
            for (let i = 2; i >= 0; i--) {
                if (cellDigits[i][j].value !== 0) {
                    for (let k = 3; k > i; k--) {
                        if (noBlockVertically(j, i, k, cellDigits)) {
                            if (cellDigits[k][j].value === 0) {
                                digitsForAnimation[i][j].toRow = k

                                cellDigits[k][j].value = cellDigits[i][j].value
                                cellDigits[i][j].value = 0

                                break
                            } else if (
                                cellDigits[k][j].value ===
                                cellDigits[i][j].value
                            ) {
                                digitsForAnimation[i][j].toRow = k

                                cellDigits[k][j].value = +cellDigits[i][j].value
                                cellDigits[i][j].value = 0

                                break
                            }
                        }
                    }
                }
            }
        }

        setData({ cellDigits: digitsForAnimation })

        return cellDigits
    })

    const isGameOver = useMemoizedFn(() => void 0)
    return (
        <div>
            <Panel score={score} onNewGame={handleNewGame} />
            {cellDigits && <Board cellDigits={cellDigits} />}
            {/* <Test /> */}
        </div>
    )
}

export default App
