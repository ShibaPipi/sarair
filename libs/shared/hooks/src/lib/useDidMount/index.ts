import { EffectCallback, useEffect } from 'react'

export const useDidMount = (callback: EffectCallback) => {
    useEffect(() => {
        callback()
    }, [])
}
