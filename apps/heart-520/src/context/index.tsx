import { createContext } from 'react'

interface TimeContextValue {
    timeup: boolean
    methods: {
        setTimeup: (timeup: boolean) => void
    }
}

export const TimeContext = createContext<TimeContextValue | undefined>(
    undefined
)
