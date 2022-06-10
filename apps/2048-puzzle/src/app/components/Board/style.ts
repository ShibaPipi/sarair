import styled from '@emotion/styled'

import { backgroundColor, cellDigitColor } from '../../../utils/color'
import { animateDurationAppear, animateDurationShift } from '../../../config'
import {
    BORDER_RADIUS_DESKTOP,
    CELL_GUTTER_MOBILE,
    CELL_SIZE_DESKTOP,
    CELL_SIZE_MOBILE,
    fontSizeCoefficient,
    FONT_SIZE_DESKTOP,
    GRID_CONTAINER_SIZE_DESKTOP,
    GRID_CONTAINER_SIZE_MOBILE,
    isMobile
} from '../../../utils/size'
import {
    calcPos,
    calcPosMobile,
    calcPosZero,
    calcPosZeroMobile
} from '../../../utils/position'

export const CellDigit = styled.div<{
    top: number
    left: number
    value: number
}>`
    display: ${({ value }) => (value ? 'block' : 'none')};
    position: absolute;
    background-color: ${({ value }) => backgroundColor(value)};
    width: ${({ value }) =>
        value ? (isMobile ? `${CELL_SIZE_MOBILE}px` : CELL_SIZE_DESKTOP) : 0};
    height: ${({ value }) =>
        value ? (isMobile ? `${CELL_SIZE_MOBILE}px` : CELL_SIZE_DESKTOP) : 0};
    top: ${({ top }) => (isMobile ? calcPosMobile(top) : calcPos(top))};
    left: ${({ left }) => (isMobile ? calcPosMobile(left) : calcPos(left))};
    color: ${({ value }) => cellDigitColor(value)};

    border-radius: ${isMobile
        ? `${0.02 * GRID_CONTAINER_SIZE_MOBILE}px`
        : BORDER_RADIUS_DESKTOP};
    font-family: Arial;
    font-weight: bold;
    font-size: ${({ value }) =>
        isMobile
            ? `${CELL_SIZE_MOBILE * fontSizeCoefficient(value)}px`
            : FONT_SIZE_DESKTOP};
    line-height: ${isMobile ? `${CELL_SIZE_MOBILE}px` : CELL_SIZE_DESKTOP};
    text-align: center;
`

export const TransitionWrapper = styled.div<{
    top: number
    left: number
    toTop: number | null
    toLeft: number | null
    value: number
}>`
    .appear-enter {
        width: 0;
        height: 0;
        top: ${({ top }) =>
            isMobile ? calcPosZeroMobile(top) : calcPosZero(top)};
        left: ${({ left }) =>
            isMobile ? calcPosZeroMobile(left) : calcPosZero(left)};
        font-size: 0;
        line-height: 0;
    }

    .appear-enter-active {
        ${isMobile
            ? `
                width: ${CELL_SIZE_MOBILE}px;
                height: ${CELL_SIZE_MOBILE}px;
            `
            : `
                width: ${CELL_SIZE_DESKTOP};
                height: ${CELL_SIZE_DESKTOP};
        `}

        top: ${({ top }) => (isMobile ? calcPosMobile(top) : calcPos(top))};
        left: ${({ left }) => (isMobile ? calcPosMobile(left) : calcPos(left))};
        transition: all ${animateDurationAppear}ms;
    }

    ${({ toLeft, left }) =>
        toLeft !== null &&
        `
        .shift-horizontally-enter {
            left: ${isMobile ? calcPosMobile(left) : calcPos(left)};
        }

        .shift-horizontally-enter-active {
            left: ${isMobile ? calcPosMobile(toLeft) : calcPos(toLeft)};
            transition: left ${animateDurationShift}ms;
        }
    `}

    ${({ toTop, top }) =>
        toTop !== null &&
        `
        .shift-vertically-enter {
            top: ${isMobile ? calcPosMobile(top) : calcPos(top)};
        }

        .shift-vertically-enter-active {
            top: ${isMobile ? calcPosMobile(toTop) : calcPos(toTop)};
            transition: top ${animateDurationShift}ms;
        }
    `}
`

export const CellGrid = styled.div<{ top: number; left: number }>`
    ${isMobile
        ? `
            width: ${CELL_SIZE_MOBILE}px;
            height: ${CELL_SIZE_MOBILE}px;
            border-radius: ${0.02 * GRID_CONTAINER_SIZE_MOBILE}px;
        `
        : `
            width: ${CELL_SIZE_DESKTOP};
            height: ${CELL_SIZE_DESKTOP};
            border-radius: ${BORDER_RADIUS_DESKTOP};
    `}

    background-color: #ccc0b3;
    position: absolute;
    top: ${({ top }) => (isMobile ? calcPosMobile(top) : calcPos(top))};
    left: ${({ left }) => (isMobile ? calcPosMobile(left) : calcPos(left))};
`

export const BoardWrapper = styled.div`
    ${isMobile
        ? `
            width: ${GRID_CONTAINER_SIZE_MOBILE}px;
            height: ${GRID_CONTAINER_SIZE_MOBILE}px;
            margin: ${CELL_GUTTER_MOBILE}px;
            border-radius: ${0.02 * GRID_CONTAINER_SIZE_MOBILE}px;
        `
        : `
            width: ${GRID_CONTAINER_SIZE_DESKTOP};
            height: ${GRID_CONTAINER_SIZE_DESKTOP};
            padding: 2rem;
            border-radius: 1rem;
    `}

    background-color: #bbada0;
    position: relative;
`
