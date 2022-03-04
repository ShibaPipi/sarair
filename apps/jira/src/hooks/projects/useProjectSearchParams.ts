import { useMemo } from 'react'

import { useUrlState } from '@sarair/shared/hooks'

export const useProjectSearchParams = () => {
    const [{ name, personId }, setParam] = useUrlState({
        name: '',
        personId: ''
    })

    return [{ name, personId: +personId || undefined }, setParam] as const
}
