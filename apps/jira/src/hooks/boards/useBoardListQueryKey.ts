import { useMemo } from 'react'

import { BOARD_LIST_CACHE_KEY, useBoardSearchParams } from '.'

export const useBoardListQueryKey = () => {
    const params = useBoardSearchParams()

    return useMemo(() => [BOARD_LIST_CACHE_KEY, params], [params])
}
