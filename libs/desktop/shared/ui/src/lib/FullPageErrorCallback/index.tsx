import React from 'react'

import type { ErrorBoundaryType } from '@sarair/shared/types'

import { FullPage } from '@sarair/shared/ui'
import { ErrorBox } from '../ErrorBox'

export const FullPageErrorCallback: React.FC<ErrorBoundaryType> = ({
    error
}) => {
    return (
        <FullPage>
            <ErrorBox error={error} />
        </FullPage>
    )
}
