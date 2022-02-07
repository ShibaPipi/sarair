import React from 'react'

import type { ErrorBoundaryType } from '@sarair/shared/types'

import { FullPage } from '@sarair/shared/ui'
import { TypographyText } from '../antd'

export const FullPageErrorCallback: React.FC<ErrorBoundaryType> = ({
    error
}) => {
    return (
        <FullPage>
            {error ? (
                <TypographyText type="danger">{error?.message}</TypographyText>
            ) : null}
        </FullPage>
    )
}
