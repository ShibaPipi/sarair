import { FC } from 'react'
import styled from '@emotion/styled'

import { backgroundColor, cellDigitColor } from '../../utils/color'
import { position } from '../../utils/position'

interface BoardProps {
    cellDigit: number[][]
}

export const Board: FC<BoardProps> = ({ cellDigit }) => {
    return (
        <BoardWrapper>
            {cellDigit.map((valueArray, y) =>
                valueArray.map((_, x) => <Cell key={x} left={x} top={y} />)
            )}
            {cellDigit.map((valueArray, y) =>
                valueArray.map((value, x) => (
                    <CellDigit
                        key={x}
                        style={
                            0 === value
                                ? {
                                      width: 0,
                                      height: 0,
                                      top: position(y),
                                      left: position(x),
                                      display: 'none'
                                  }
                                : {
                                      width: '10rem',
                                      height: '10rem',
                                      top: position(y),
                                      left: position(x),
                                      color: cellDigitColor(value),
                                      backgroundColor: backgroundColor(value)
                                  }
                        }
                    >
                        {value}
                    </CellDigit>
                ))
            )}
        </BoardWrapper>
    )
}

const CellDigit = styled.div`
    border-radius: 0.6rem;
    font-family: Arial;
    font-weight: bold;
    font-size: 6rem;
    line-height: 10rem;
    text-align: center;
    position: absolute;
`

const Cell = styled.div<{ left: number; top: number }>`
    width: 10rem;
    height: 10rem;
    border-radius: 0.6rem;
    background-color: #ccc0b3;
    position: absolute;
    top: ${({ top }) => position(top)};
    left: ${({ left }) => position(left)};
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
