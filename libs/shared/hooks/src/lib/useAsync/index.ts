import { useReducer, useState } from 'react'

import { useMemoizedFn } from '../useMemoizedFn'
import { useUnmountedRef } from '../useUnmountedRef'

enum StatusEnum {
    IDLE = 'idle',
    LOADING = 'loading',
    ERROR = 'error',
    SUCCESS = 'success'
}

interface State<D> {
    status: StatusEnum
    data: D | null
    error: Error | null
}

const defaultInitialState: State<null> = {
    status: StatusEnum.IDLE,
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const unmountedRef = useUnmountedRef()

    return useMemoizedFn((...args: T[]) =>
        unmountedRef.current ? void 0 : dispatch(...args)
    )
}

export const useAsync = <D>(
    initialState?: Partial<State<D>>,
    initialConfig?: typeof defaultConfig
) => {
    const config = { ...defaultConfig, ...initialConfig }

    const [state, dispatch] = useReducer<
        (state: State<D>, action: Partial<State<D>>) => State<D>
    >(
        (state: State<D>, action: Partial<State<D>>) => ({
            ...state,
            ...action
        }),
        {
            ...defaultInitialState,
            ...initialState
        }
    )

    const safeDispatch = useSafeDispatch(dispatch)

    const [retry, setRetry] = useState<() => void>(() => () => void 0)

    const setData = useMemoizedFn((data: D) =>
        safeDispatch({
            status: StatusEnum.SUCCESS,
            data,
            error: null
        })
    )

    const setError = useMemoizedFn((error: Error) =>
        safeDispatch({
            status: StatusEnum.ERROR,
            data: null,
            error
        })
    )

    const run = useMemoizedFn(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                throw new Error('The parameter promise must be a Promise')
            }

            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig)
                }
            })

            safeDispatch({ status: StatusEnum.LOADING })

            return promise
                .then(data => {
                    setData(data)
                    return data
                })
                .catch(error => {
                    setError(error)

                    // catch 会消化异常，如果不主动抛出，外面是接收不到异常的
                    if (config.throwOnError) return Promise.reject(error)

                    return error
                })
        }
    )

    return {
        ...state,
        isIdle: state.status === StatusEnum.IDLE,
        isLoading: state.status === StatusEnum.LOADING,
        isSuccess: state.status === StatusEnum.SUCCESS,
        isError: state.status === StatusEnum.ERROR,
        methods: {
            run,
            setData,
            setError,
            // retry 被调用时重新跑一遍run，让state刷新一遍
            retry
        }
    }
}
