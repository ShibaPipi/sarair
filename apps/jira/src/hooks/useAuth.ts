import { useContext } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

import { AuthContext } from '@sarair/shared/context'
// import { AuthForm, User } from '@sarair/shared/context'
// import { useMemoizedFn } from '@sarair/shared/hooks'
// import * as authStore from '../store/auth.slice'

export const useAuth = () => {
    // 使用 context
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error('the hook useAuth must be used in AuthProvider.')
    }

    return authContext

    // 使用 redux
    // const user = useSelector(authStore.selectUser)
    //
    // const dispatch = useDispatch<(...args: unknown[]) => Promise<User>>()
    // const login = useMemoizedFn((form: AuthForm) =>
    //     dispatch(authStore.login(form))
    // )
    // const register = useMemoizedFn((form: AuthForm) =>
    //     dispatch(authStore.register(form))
    // )
    // const logout = useMemoizedFn(() => dispatch(authStore.logout()))
    //
    // return {
    //     user,
    //     methods: {
    //         login,
    //         register,
    //         logout
    //     }
    // }
}
