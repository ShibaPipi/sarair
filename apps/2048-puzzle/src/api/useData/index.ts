import {
    useLockFn,
    useMemoizedFn,
    useSetState,
    useThrottleFn
} from '@sarair/shared/hooks'
import { useMemo } from 'react'
import {
    animateDurationShift,
    initState,
    intervalIsGameOver
} from '../../config'
import { CellDigits } from '../../models'
import { getRandNumPos, resetCellDataRand } from '../../utils/random'
import {
    calcDataShiftDown,
    calcDataShiftLeft,
    calcDataShiftRight,
    calcDataShiftUp,
    cannotShift,
    canShiftDown,
    canShiftLeft,
    canShiftRight,
    canShiftUp,
    noSpace
} from '../../utils/shift'

interface PageTouch {
    startX: number
    startY: number
}

export const useData = () => {
    const [{ score, cellDigits }, setData] = useSetState<{
        score: number
        cellDigits: CellDigits
    }>(initState())

    const [{ startX, startY }, setTouch] = useSetState<PageTouch>()

    const resetBoard = useMemoizedFn(async () => setData(initState()))

    const randomOneNumber = useMemoizedFn(async () => {
        if (noSpace(cellDigits)) {
            return
        }
        // 重置数据的 random 属性
        setData({ cellDigits: resetCellDataRand(cellDigits) })

        const [top, left] = getRandNumPos(cellDigits)
        // 随机一个数字，并显示这个数字
        cellDigits[top][left].value = Math.random() > 0.5 ? 2 : 4
        cellDigits[top][left].random = true

        setData({ cellDigits })
    })

    const handleShift = useMemoizedFn(
        (data: readonly [CellDigits, CellDigits, number]) => {
            const [digitsForAnimation, digitsForUpdate, score] = data

            setData({ cellDigits: digitsForAnimation })

            setTimeout(() => {
                setData(({ score: prevScore }) => ({
                    score: prevScore + score,
                    cellDigits: digitsForUpdate
                }))
                randomOneNumber()
            }, animateDurationShift)
        }
    )

    const { run: onTouchEnd } = useThrottleFn(
        ({ changedTouches }: TouchEvent) => {
            const { pageX: endX, pageY: endY } = changedTouches[0]

            const deltaX = endX - startX
            const deltaY = endY - startY

            if (
                Math.abs(deltaX) <
                    0.2 * window.document.documentElement.clientWidth &&
                Math.abs(deltaY) <
                    0.2 * window.document.documentElement.clientWidth
            ) {
                return
            }

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    // shift left
                    if (canShiftRight(cellDigits)) {
                        handleShift(calcDataShiftRight(cellDigits))
                        return
                    }
                }
                // shift right
                if (canShiftLeft(cellDigits)) {
                    handleShift(calcDataShiftLeft(cellDigits))
                    return
                }
            }
            if (deltaY > 0) {
                // shift down
                if (canShiftDown(cellDigits)) {
                    handleShift(calcDataShiftDown(cellDigits))
                    return
                }
            }
            // shift up
            if (canShiftUp(cellDigits)) {
                handleShift(calcDataShiftUp(cellDigits))
            }
        },
        { wait: intervalIsGameOver + 100 }
    )
    const onTouchStart = ({ touches }: TouchEvent) =>
        setTouch({ startX: touches[0].pageX, startY: touches[0].pageY })

    const { run: onKeyDown } = useThrottleFn(
        ({ code, preventDefault }: KeyboardEvent) => {
            switch (code) {
                case 'ArrowLeft':
                    preventDefault()
                    if (canShiftLeft(cellDigits)) {
                        handleShift(calcDataShiftLeft(cellDigits))
                    }
                    break
                case 'ArrowRight':
                    preventDefault()
                    if (canShiftRight(cellDigits)) {
                        handleShift(calcDataShiftRight(cellDigits))
                    }
                    break
                case 'ArrowUp':
                    preventDefault()
                    if (canShiftUp(cellDigits)) {
                        handleShift(calcDataShiftUp(cellDigits))
                    }
                    break
                case 'ArrowDown':
                    preventDefault()
                    if (canShiftDown(cellDigits)) {
                        handleShift(calcDataShiftDown(cellDigits))
                    }
                    break
                default:
                    return
            }
        },
        { wait: intervalIsGameOver + 100 }
    )

    const newGame = useLockFn(async () => {
        await resetBoard()
        await randomOneNumber()
        await randomOneNumber()
    })

    const isGameOver = useMemo(
        () => noSpace(cellDigits) && cannotShift(cellDigits),
        [cellDigits]
    )

    return {
        score,
        cellDigits,
        isGameOver,
        methods: { newGame, onKeyDown, onTouchEnd, onTouchStart }
    }
}
