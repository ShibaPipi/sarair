import { ReactNode, useState } from 'react'
import dayjs from 'dayjs'

import { TimeContext } from '../context'
import { TIMEUP } from '../config'

export const TimeProvider = ({ children }: { children: ReactNode }) => {
    const [timeup, setTimeup] = useState(dayjs().isAfter(TIMEUP))

    return (
        <TimeContext.Provider
            children={children}
            value={{ timeup, methods: { setTimeup } }}
        />
    )
}
