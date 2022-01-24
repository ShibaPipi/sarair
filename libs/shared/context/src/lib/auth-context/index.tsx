import { createContext, useContext } from 'react'

export interface User {
    id: number
    name: string
    email: string
    title: string
    organization: string
    token: string
}

export interface AuthForm {
    username: string
    password: string
}

interface AuthContextValue {
    user: User | null
    methods: {
        login: (form: AuthForm) => Promise<void>
        register: (form: AuthForm) => Promise<void>
        logout: () => Promise<void>
    }
}

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
)

export const useAuth = () => {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error('the hook useAuth must be used in AuthProvider.')
    }

    return authContext
}
