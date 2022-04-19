import { all, __, map, slice, take, compose } from 'ramda'

import { CellData, CellDigits } from '../models'
import { isLeftmost, isRightmost } from './position'

/**
 * 判断下方是否有空格（value 是否为 0）或者下方数字等于 value，最上边一行不判断，直接跳过
 *
 * @param cellDigits
 */
export const canShiftDown = (cellDigits: CellDigits) => {
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (
                cellDigits[i][j].value !== 0 &&
                (cellDigits[i + 1][j].value === 0 ||
                    cellDigits[i + 1][j].value === cellDigits[i][j].value)
            ) {
                return true
            }
        }
    }

    return false
}

/**
 * 判断上方是否有空格（value 是否为 0）或者上方数字等于 value，最上边一行不判断，直接跳过
 *
 * @param cellDigits
 */
export const canShiftUp = (cellDigits: CellDigits) => {
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (
                cellDigits[i][j].value !== 0 &&
                (cellDigits[i - 1][j].value === 0 ||
                    cellDigits[i - 1][j].value === cellDigits[i][j].value)
            ) {
                return true
            }
        }
    }

    return false
}

/**
 * 判断右方是否有空格（value 是否为 0）或者右方数字等于 value，最右边一行不判断，直接跳过
 *
 * @param cellDigits
 */
export const canShiftRight = (cellDigits: CellDigits) => {
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (
                cellDigits[i][j].value !== 0 &&
                (cellDigits[i][j + 1].value === 0 ||
                    cellDigits[i][j + 1].value === cellDigits[i][j].value)
            ) {
                return true
            }
        }
    }

    return false
}

/**
 * 判断左方是否有空格（value 是否为 0）或者左方数字等于 value，最左边一行不判断，直接跳过
 *
 * @param cellDigits
 */
export const canShiftLeft = (cellDigits: CellDigits) => {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (
                cellDigits[i][j].value !== 0 &&
                (cellDigits[i][j - 1].value === 0 ||
                    cellDigits[i][j - 1].value === cellDigits[i][j].value)
            ) {
                return true
            }
        }
    }

    return false
}

/**
 * 判断 data 的第 col 列，从第 row1 到 row2 之间是否不存在障碍物，即不等于 0 的格子
 *
 * @param row
 * @param col1
 * @param col2
 */
export const noBlockVertically = (
    col: number,
    row1: number,
    row2: number,
    data: CellDigits
) => {
    if (col === 0 && row1 === 2 && row2 === 3) {
        // slice(
        //     row1 + 1,
        //     row2
        // )(map((row: CellData[]) => row[col])(data)).forEach(item =>
        //     console.log(item)
        // )
        // console.log(
        //     data
        //     // data.map(item => item[col]),
        //     // slice(row1 + 1, row2)
        //     // map((row: CellData[]) => row[col])(data)
        // )
    }
    return compose(
        all(({ value }) => value === 0),
        slice(row1 + 1, row2),
        map((row: CellData[]) => row[col])
    )(data)
}

/**
 * 判断 data 的第 row 行，从第 col1 到 col2 之间是否不存在障碍物，即不等于 0 的格子
 *
 * @param row
 * @param col1
 * @param col2
 */
export const noBlockHorizontally = (
    row: number,
    col1: number,
    col2: number,
    data: CellDigits
) => slice(col1 + 1, col2, data[row]).every(({ value }) => value === 0)

export const noSpace = (cellDigits: CellDigits) =>
    !cellDigits.some(rowArray => rowArray.some(({ value }) => 0 === value))