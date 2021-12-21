import React, { PropsWithChildren } from 'react'

import type { ErrorBoundaryType } from '@sarair/shared/types'

type FallbackRender = React.FC<ErrorBoundaryType>
type ErrorBoundaryProps = PropsWithChildren<{ fallbackRender: FallbackRender }>

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryType
> {
    state = { error: null }

    // 当子组件抛出异常，此处会接收到并且调用
    static getDerivedStateFromError(error: Error) {
        return { error }
    }

    render() {
        const { error } = this.state
        const { fallbackRender, children } = this.props

        return error ? fallbackRender({ error }) : children
    }
}
