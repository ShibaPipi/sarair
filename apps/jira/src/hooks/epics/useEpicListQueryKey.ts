import { useMemo } from 'react'

import { EPIC_LIST_CACHE_KEY, useEpicSearchParams } from '.'

export const useEpicListQueryKey = () => {
    const params = useEpicSearchParams()

    return useMemo(() => [EPIC_LIST_CACHE_KEY, params], [params])
}
