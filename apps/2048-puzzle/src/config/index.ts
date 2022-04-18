import { CellData } from '../models'

export const responseIntervalTime = 150

export const actionNewGameThrottleTime = responseIntervalTime + 50
export const actionShiftThrottleTime = responseIntervalTime * 2

export const animateDurationAppear = responseIntervalTime
export const animateDurationShift = responseIntervalTime

export const initState = () => ({
    score: 0,
    cellDigits: Array(4)
        .fill([])
        .map(() =>
            Array<CellData>(4)
                .fill({} as CellData)
                .map(() => ({
                    toRow: null,
                    toCol: null,
                    value: 0,
                    random: false
                }))
        )
})
