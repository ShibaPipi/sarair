import { useMemo } from 'react'

import { useUrlState } from '@sarair/shared/hooks'

export const useProjectUrlState = () => {
    const [param, setParam] = useUrlState({ name: '', personId: '' })

    return [
        useMemo(
            () => ({ ...param, personId: Number(param.personId) || undefined }),
            [param]
        ),
        setParam
    ] as const
}
