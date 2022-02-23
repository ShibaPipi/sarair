import React, { ReactNode } from 'react'

import { sarairRequest } from '@sarair/shared/request'
import { getToken } from '@sarair/shared/utils'

import type { User } from '@sarair/shared/context'

export const bootstrapUser = async () => {
    if (!getToken()) return null

    return await sarairRequest.get<User>('me')
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    return <div>{children}</div>
}
