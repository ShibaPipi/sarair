import { FC, useRef } from 'react'
import styled from '@emotion/styled'
import { CSSTransition } from 'react-transition-group'

import { animateDurationAppear, animateDurationShift } from '../../config'
import { CellDigits } from '../../models'
import { backgroundColor, cellDigitColor } from '../../utils/color'
import { calcPosLeft, calcPosTop } from '../../utils/position'
interface BoardProps {
    cellDigits: CellDigits
}

export const Board: FC<BoardProps> = ({ cellDigits }) => {
    // console.log(cellDigits)

    return (
        <BoardWrapper>
            {cellDigits.map((rows, row) =>
                rows.map((_, col) => (
                    <CellGrid
                        key={`${row}-${col}`}
                        className={`${row}-${col}`}
                        top={row}
                        left={col}
                    />
                ))
            )}
            {cellDigits.map((rows, row) =>
                rows.map(({ value, random, toRow, toCol }, col) => (
                    <TransitionWrapper
                        key={`${row}-${col}`}
                        top={row}
                        left={col}
                        toTop={toRow}
                        toLeft={toCol}
                        value={value}
                    >
                        <CSSTransition
                            classNames="appear"
                            in={random}
                            timeout={animateDurationAppear}
                        >
                            <CSSTransition
                                in={toCol !== null}
                                timeout={animateDurationShift}
                                classNames="shift-horizontally"
                            >
                                <CSSTransition
                                    in={toRow !== null}
                                    timeout={animateDurationShift}
                                    classNames="shift-vertically"
                                >
                                    <CellDigit
                                        top={row}
                                        left={col}
                                        value={value}
                                    >
                                        {value}
                                    </CellDigit>
                                </CSSTransition>
                            </CSSTransition>
                        </CSSTransition>
                    </TransitionWrapper>
                ))
            )}
        </BoardWrapper>
    )
}

const CellDigit = styled.div<{
    top: number
    left: number
    value: number
}>`
    display: ${({ value }) => (value ? 'block' : 'none')};
    position: absolute;
    background-color: ${({ value }) => backgroundColor(value)};
    width: ${({ value }) => (value ? '10rem' : 0)};
    height: ${({ value }) => (value ? '10rem' : 0)};
    top: ${({ top }) => calcPosTop(top)}rem;
    left: ${({ left }) => calcPosLeft(left)}rem;
    color: ${({ value }) => cellDigitColor(value)};
    border-radius: 0.6rem;
    font-family: Arial;
    font-weight: bold;
    font-size: 6rem;
    line-height: 10rem;
    text-align: center;
`

const TransitionWrapper = styled.div<{
    top: number
    left: number
    toTop: number | null
    toLeft: number | null
    value: number
}>`
    .appear-enter {
        width: 0;
        height: 0;
        top: ${({ top }) => calcPosTop(top) + 5}rem;
        left: ${({ left }) => calcPosLeft(left) + 5}rem;
        font-size: 0;
        line-height: 0;
    }

    .appear-enter-active {
        width: 10rem;
        height: 10rem;
        top: ${({ top }) => calcPosTop(top)}rem;
        left: ${({ left }) => calcPosLeft(left)}rem;
        transition: all ${animateDurationAppear}ms;
    }

    ${({ toLeft, left }) =>
        toLeft !== null &&
        `
        .shift-horizontally-enter {
            left: ${calcPosLeft(left)}rem;
        }

        .shift-horizontally-enter-active {
            left: ${calcPosLeft(toLeft)}rem;
            transition: left ${animateDurationShift}ms;
        }
    `}

    ${({ toTop, top }) =>
        toTop !== null &&
        `
        .shift-vertically-enter {
            top: ${calcPosTop(top)}rem;
        }

        .shift-vertically-enter-active {
            top: ${calcPosTop(toTop)}rem;
            transition: top ${animateDurationShift}ms;
        }
    `}
`

const CellGrid = styled.div<{ top: number; left: number }>`
    width: 10rem;
    height: 10rem;
    border-radius: 0.6rem;
    background-color: #ccc0b3;
    position: absolute;
    top: ${({ top }) => calcPosTop(top)}rem;
    left: ${({ left }) => calcPosLeft(left)}rem;
`

const BoardWrapper = styled.div`
    width: 46rem;
    height: 46rem;
    padding: 2rem;
    margin: 5rem auto;
    background-color: #bbada0;
    border-radius: 1rem;
    position: relative;
`
