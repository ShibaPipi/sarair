import { FC } from 'react'
import styled from '@emotion/styled'

import { healthFieldsMap, tips } from '../../../../models'

import type { TipKey } from '../../../../models'

interface CellProps {
    value: number
    tipKey: TipKey
}

export const Cell: FC<CellProps> = ({ value, tipKey }) => {
    const color = tips[tipKey].getColor?.(value).color as string

    return (
        <Span color={color}>
            {value}
            {healthFieldsMap[tipKey]?.unit}
        </Span>
    )
}

const Span = styled.span<{ color: string }>`
    color: ${({ color }) => color};
`
