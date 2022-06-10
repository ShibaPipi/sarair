export const randNumLoopMaxTime = 50

export const responseIntervalTime = 100

export const animateDurationAppear = responseIntervalTime
export const animateDurationShift = responseIntervalTime

export const intervalIsGameOver = animateDurationAppear + animateDurationShift

export const initState = () => ({
    score: 0,
    cellDigits: [
        [4, 4, 4, 4],
        [4, 4, 4, 4],
        [4, 4, 4, 4],
        [4, 4, 4, 4]
    ].map(row =>
        row.map(value => ({
            value,
            toRow: null,
            toCol: null,
            random: false
        }))
    )
})

export const initMerged = () =>
    Array(4)
        .fill([])
        .map(() => Array(4).fill(false))
