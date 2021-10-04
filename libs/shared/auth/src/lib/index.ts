import { sarairRequest } from '@sarair/shared/request'
import { removeToken, setToken } from '@sarair/shared/utils'

import type { AuthForm, User } from '@sarair/shared/context'

export const handleUserResponse = (user: User) => {
  setToken(user.token || '')
  return user
}

export const login = ({ username, password }: AuthForm) => {
  return sarairRequest
    .post<User>('login', { username, password })
    .then(handleUserResponse)
}

export const register = ({ username, password }: AuthForm) => {
  return sarairRequest
    .post<User>('register', { username, password })
    .then(handleUserResponse)
}

export const logout = async () => removeToken()
