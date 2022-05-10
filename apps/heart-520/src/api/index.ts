import { useContext } from 'react'

import { TimeContext } from '../context'

export const useTime = () => {
    const timeContext = useContext(TimeContext)

    if (!timeContext) {
        throw new Error('the hook useTime must be used in TimeProvider.')
    }

    return timeContext
}
