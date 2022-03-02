import React, { ReactNode, useState } from 'react'
import { useQueryClient } from 'react-query'
// import { useDispatch } from 'react-redux'

import * as auth from '@sarair/shared/auth'
import { useMount } from '@sarair/shared/hooks'
import { AuthContext } from '@sarair/shared/context'
import { sarairRequest } from '@sarair/shared/request'
import { getToken } from '@sarair/shared/utils'
// import { bootstrap } from '../store/auth.slice'

import type { AuthForm, User } from '@sarair/shared/context'

export const bootstrapUser = async () => {
    if (!getToken()) return null

    return await sarairRequest.get<User>('me')
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient()
    // 使用 context
    const [user, setUser] = useState<User | null>(null)

    // point free
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () =>
        auth.logout().then(() => {
            setUser(null)
            queryClient.clear()
        })

    useMount(() => {
        bootstrapUser().then(setUser)
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

    // 使用 redux
    // const dispatch = useDispatch<(...args: unknown[]) => Promise<User>>()
    //
    // useMount(() => {
    //     dispatch(bootstrap())
    // })
    //
    // return <div>{children}</div>
}
