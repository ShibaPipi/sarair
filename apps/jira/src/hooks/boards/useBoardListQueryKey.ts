import { useMemo } from 'react'

import { BOARD_LIST_CACHE_KEY } from '.'
import { useBoardSearchParams } from './useBoardSearchParams'

export const useBoardListQueryKey = () => {
    const params = useBoardSearchParams()

    return useMemo(() => [BOARD_LIST_CACHE_KEY, params], [params])
}
