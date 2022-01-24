import useUrlStateBase, { Options } from '@ahooksjs/use-url-state'
import { useMemoizedFn } from '../useMemoizedFn'

const useUrlState = <S extends Record<string, string>>(
    initialState?: S | (() => S),
    options?: Options
) => {
    const [state, set] = useUrlStateBase<S>(initialState, options)

    const setState = useMemoizedFn(
        (params: Partial<{ [K in keyof S]: unknown }>) => {
            set(
                Object.keys(params).reduce<Partial<S>>(
                    (acc, key) => ({
                        ...acc,
                        [key]: params[key] === '' ? undefined : params[key]
                    }),
                    {}
                )
            )
        }
    )

    return [state, setState] as const
}

export { useUrlState }
