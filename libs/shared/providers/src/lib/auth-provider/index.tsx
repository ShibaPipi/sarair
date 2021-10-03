import React, { ReactNode, useState } from 'react'

import * as auth from '@sarair/shared/auth'
import { AuthContext } from '@sarair/shared/context'

import type { AuthForm, User } from '@sarair/shared/context'

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