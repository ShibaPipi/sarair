const localStorageKey = '__AUTH__PROVIDER_TOKEN__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const setToken = (token: string) =>
    window.localStorage.setItem(localStorageKey, token)

export const removeToken = () => window.localStorage.removeItem(localStorageKey)
