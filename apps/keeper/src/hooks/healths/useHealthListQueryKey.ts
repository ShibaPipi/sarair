import { useMemo } from 'react'

import { HEALTH_LIST_CACHE_KEY, useHealthSearchParams } from '.'

export const useHealthListQueryKey = () => {
    const [params] = useHealthSearchParams()

    return useMemo(() => [HEALTH_LIST_CACHE_KEY, params], [params])
}
