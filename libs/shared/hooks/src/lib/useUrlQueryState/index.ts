/**
 * Return key, value of url query string
 */
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useUrlQueryState = <Key extends string>(keys: Key[]) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const urlQueryState = useMemo(
        () =>
            keys.reduce(
                (acc, key) => ({ ...acc, [key]: searchParams.get(key) || '' }),
                {} as Record<Key, string>
            ),
        [searchParams]
    )

    return [urlQueryState, setSearchParams] as const
}
