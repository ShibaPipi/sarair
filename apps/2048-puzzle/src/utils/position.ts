export const calcPosLeft = (left: number) => (20 + left * 120) / 10

export const calcPosTop = (top: number) => (20 + top * 120) / 10

export const getRandomPos = () => Math.floor(Math.random() * 4)

export const isLeftmost = (leftIdx: number) => leftIdx !== 0

export const isRightmost = (idx: number) => idx % 4 === 3

export const isUppermost = (idx: number) => idx <= 4

export const isUndermost = (idx: number) => idx >= 12
