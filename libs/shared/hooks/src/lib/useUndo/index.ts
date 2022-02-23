import { useMemo, useReducer } from 'react'
import { last } from 'ramda'

import { useMemoizedFn } from '../useMemoizedFn'

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

interface State<T> {
    past: T[]
    present: T
    future: T[]
}

interface Action<T> {
    type: typeof UNDO | typeof REDO | typeof SET | typeof RESET
    newPresent?: T
}

const reducer = <T>(state: State<T>, action: Action<T>) => {
    const { past, present, future } = state
    const { newPresent, type } = action

    switch (type) {
        case UNDO:
            if (past.length === 0) return state

            return {
                present: last(past) as T,
                past: past.slice(0, past.length - 1),
                future: [present, ...future]
            }
        case REDO:
            if (future.length !== 0) return state

            return {
                present: future[0],
                past: [...past, present],
                future: future.slice(1)
            }
        case SET:
            if (newPresent === present) return state

            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        case RESET:
            if (newPresent === present) return state

            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        default:
            return state
    }
}

export const useUndo = <T>(initialPresent: T) => {
    const [state, dispatch] = useReducer(reducer, {
        past: [],
        present: initialPresent,
        future: []
    })

    const canUndo = useMemo(() => state.past.length !== 0, [state.past.length])
    const canRedo = useMemo(
        () => state.future.length !== 0,
        [state.future.length]
    )

    const undo = useMemoizedFn(() => dispatch({ type: UNDO }))
    const redo = useMemoizedFn(() => dispatch({ type: REDO }))
    const set = useMemoizedFn((newPresent: T) =>
        dispatch({ type: SET, newPresent })
    )
    const reset = useMemoizedFn((newPresent: T) =>
        dispatch({ type: RESET, newPresent })
    )

    return {
        state,
        canUndo,
        canRedo,
        methods: {
            set,
            reset,
            undo,
            redo
        }
    }
}