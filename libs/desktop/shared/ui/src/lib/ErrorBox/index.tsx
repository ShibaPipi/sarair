import React from 'react'

import { TypographyText } from '@sarair/desktop/shared/ui'

// type guard
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isError = (value: any): value is Error => value?.message

interface ErrorBoxProps {
    error: unknown
}

export const ErrorBox: React.FC<ErrorBoxProps> = ({ error }) => {
    return isError(error) ? (
        <TypographyText type="danger">{error?.message}</TypographyText>
    ) : null
}
