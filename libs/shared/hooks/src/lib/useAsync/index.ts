import { useCallback, useState } from 'react'

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

export const useAsync = <D>(initialState?: Partial<State<D>>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const setData = (data: D) =>
    setState({
      status: StatusEnum.SUCCESS,
      data,
      error: null
    })

  const setError = (error: Error) =>
    setState({
      status: StatusEnum.ERROR,
      data: null,
      error
    })

  const run = useCallback((promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('The parameter promise must be a Promise')
    }
    setState({ ...state, status: StatusEnum.LOADING })
    return promise
      .then((data) => {
        setData(data)
        return data
      })
      .catch((error) => {
        setError(error)
        return error
      })
  }, [])

  return {
    isIdle: state.status === StatusEnum.IDLE,
    isLoading: state.status === StatusEnum.LOADING,
    isSuccess: state.status === StatusEnum.SUCCESS,
    isError: state.status === StatusEnum.ERROR,
    methods: {
      run,
      setData,
      setError
    },
    ...state
  }
}
