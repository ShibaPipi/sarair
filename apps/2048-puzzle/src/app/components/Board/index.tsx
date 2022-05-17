import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'

import { animateDurationAppear, animateDurationShift } from '../../../config'
import { CellDigits } from '../../../models'

import { HeartIcon } from '../../../components'
import { BoardWrapper, CellDigit, CellGrid, TransitionWrapper } from './style'

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
                                        {value === 2 ? (
                                            <HeartIcon
                                                style={{ color: 'hotpink' }}
                                            />
                                        ) : (
                                            value
                                        )}
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
