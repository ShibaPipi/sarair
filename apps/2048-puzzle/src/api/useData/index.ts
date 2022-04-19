import { useLockFn, useMemoizedFn, useSetState } from '@sarair/shared/hooks'
import {
    animateDurationAppear,
    animateDurationShift,
    initState,
    intervalIsGameOver
} from '../../config'
import { CellDigits } from '../../models'
import { getRandomPos } from '../../utils/position'
import { resetRandomCellData } from '../../utils/random'
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

export const useData = () => {
    const [{ score, cellDigits }, setData] = useSetState<{
        score: number
        cellDigits: CellDigits
    }>(initState())

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

    const randomOneNumber = useMemoizedFn(async () => {
        if (noSpace(cellDigits)) {
            return
        }
        // 重置数据的 random 属性
        setData({ cellDigits: resetRandomCellData(cellDigits) })
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

    const handleShift = useMemoizedFn(
        (data: readonly [CellDigits, CellDigits]) => {
            const [digitsForAnimation, digitsForUpdate] = data

            setData({ cellDigits: digitsForAnimation })

            setTimeout(() => {
                setData({ cellDigits: digitsForUpdate })
            }, animateDurationShift)
        }
    )
    const handleAfterShift = useMemoizedFn(() => {
        setTimeout(() => randomOneNumber(), animateDurationAppear + 10)
        setTimeout(() => isGameOver(), intervalIsGameOver)
    })
    const onKeyDown = useMemoizedFn(
        async ({ code }: { code: KeyboardEvent['code'] }) => {
            switch (code) {
                case 'ArrowLeft':
                    if (canShiftLeft(cellDigits)) {
                        handleShift(calcDataShiftLeft(cellDigits))
                        handleAfterShift()
                    }
                    break
                case 'ArrowRight':
                    if (canShiftRight(cellDigits)) {
                        handleShift(calcDataShiftRight(cellDigits))
                        handleAfterShift()
                    }
                    break
                case 'ArrowUp':
                    if (canShiftUp(cellDigits)) {
                        handleShift(calcDataShiftUp(cellDigits))
                        handleAfterShift()
                    }
                    break
                case 'ArrowDown':
                    if (canShiftDown(cellDigits)) {
                        handleShift(calcDataShiftDown(cellDigits))
                        handleAfterShift()
                    }
                    break
                default:
                    return
            }
        }
    )

    const newGame = useLockFn(async () => {
        await resetBoard()
        await randomOneNumber()
        await randomOneNumber()
    })

    const gameOver = useMemoizedFn(() => {
        alert('Game Over!')
    })
    const isGameOver = useMemoizedFn(() => {
        if (noSpace(cellDigits) && cannotShift(cellDigits)) {
            gameOver()
        }
    })

    return {
        score,
        cellDigits,
        methods: { newGame, onKeyDown }
    }
}
