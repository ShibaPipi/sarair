import styled from '@emotion/styled'

export const SarairRow = styled.div<{
    gap?: boolean | number
    between?: boolean
    marginBottom?: number
}>`
    display: flex;
    align-items: center;
    justify-content: ${props => (props.between ? 'space-between' : undefined)};
    margin-bottom: ${props =>
        props.marginBottom ? `${props.marginBottom}rem` : undefined};
    > * {
        margin-top: 0 !important;
        margin-right: ${props =>
            typeof props.gap === 'number'
                ? `${props.gap}rem`
                : props.gap
                ? '2rem'
                : undefined};
        margin-bottom: 0 !important;
    }
`
