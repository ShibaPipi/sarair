import React from 'react'

import { Typography } from 'antd'

// type guard
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isError = (value: any): value is Error => value?.message

interface ErrorBoxProps {
    error: unknown
}

export const ErrorBox: React.FC<ErrorBoxProps> = ({ error }) => {
    return isError(error) ? (
        <Typography.Text type="danger">{error?.message}</Typography.Text>
    ) : null
}
