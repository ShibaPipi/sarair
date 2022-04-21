import { randNumLoopMaxTime } from '../config'
import { CellDigits } from '../models'

export const resetCellDataRand = (cellDigits: CellDigits) =>
    cellDigits.map(row =>
        row.map(col => ({
            ...col,
            random: !!col.value
        }))
    )

export const getRandNumPos = (cellDigits: CellDigits) => {
    let times = 0
    // 随机一个位置
    let top = getRandomPos()
    let left = getRandomPos()
    // let top = 3
    // let left = 3

    while (times < randNumLoopMaxTime && cellDigits[top][left].value !== 0) {
        top = getRandomPos()
        left = getRandomPos()

        times++
    }

    if (times === 50) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (cellDigits[i][j].value === 0) return [i, j]
            }
        }
    }

    return [top, left] as const
}

export const getRandomPos = () => Math.floor(Math.random() * 4)
