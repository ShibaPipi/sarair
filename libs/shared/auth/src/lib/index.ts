import type { AuthForm, User } from '@sarair/shared/context'
import { sarairRequest } from '@sarair/shared/request'

const localStorageKey = '__AUTH__PROVIDER_TOKEN__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = ({ username, password }: AuthForm) => {
  return sarairRequest
    .post<User>('login', {
      data: { username, password }
    })
    .then(handleUserResponse)
}

export const register = ({ username, password }: AuthForm) => {
  return sarairRequest
    .post<User>('register', {
      data: { username, password }
    })
    .then(handleUserResponse)
}

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey)
