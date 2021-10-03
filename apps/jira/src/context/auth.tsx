import React, { createContext, ReactNode, useContext, useState } from 'react'

import * as auth from '../auth'

import type { User } from '../screens/project-list'

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

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

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

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('the hook useAuth must be used in AuthProvider.')
  }

  return authContext
}
