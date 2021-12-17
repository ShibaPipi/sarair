import React, { ReactNode, useState } from 'react'

import * as auth from '@sarair/shared/auth'
import { useMount } from '@sarair/shared/hooks'
import { AuthContext } from '@sarair/shared/context'
import { sarairRequest } from '@sarair/shared/request'
import { getToken } from '@sarair/shared/utils'

import type { AuthForm, User } from '@sarair/shared/context'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    // point free
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    useMount(() => {
        getToken() && sarairRequest.get<User>('me').then(setUser)
    })

    return (
        <AuthContext.Provider
            children={children}
            value={{
                user,
                methods: {
                    login,
                    register,
                    logout
                }
            }}
        />
    )
}
