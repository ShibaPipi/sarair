import { CELL_GUTTER_MOBILE, CELL_SIZE_MOBILE } from './size'

export const calcPos = (row: number) => `${(20 + row * 120) / 10}rem`
export const calcPosZero = (row: number) => `${(20 + row * 120) / 10 + 5}rem`

export const calcPosMobile = (row: number) =>
    `${CELL_GUTTER_MOBILE + row * (CELL_SIZE_MOBILE + CELL_GUTTER_MOBILE)}px`
export const calcPosZeroMobile = (row: number) =>
    `${
        CELL_GUTTER_MOBILE +
        row * (CELL_SIZE_MOBILE + CELL_GUTTER_MOBILE) +
        CELL_SIZE_MOBILE / 2
    }px`

export const isLeftmost = (leftIdx: number) => leftIdx !== 0

export const isRightmost = (idx: number) => idx % 4 === 3

export const isUppermost = (idx: number) => idx <= 4

export const isUndermost = (idx: number) => idx >= 12
