import { User } from '../screens/project-list'

import { sarairRequest } from '@sarair/shared/request'

import type { AuthForm } from '../context/auth'

const localStorageKey = '__AUTH__PROVIDER_TOKEN__'

export const handleUserResponse = (user: User) => {
  localStorage.setItem(localStorageKey, user.token || '')
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

export const logout = async () => localStorage.removeItem(localStorageKey)
