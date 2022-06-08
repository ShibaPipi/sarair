import { useMemo } from 'react'

import { useListQuery } from '@sarair/shared/hooks/react-query'
import { sarairRequest } from '@sarair/shared/request'

import type { User } from '@sarair/shared/context'

const USER_LIST_CACHE_KEY = 'user-list'

export const useUserList = (params?: Partial<User>) => {
    const queryKey = useMemo(() => [USER_LIST_CACHE_KEY, params], [params])

    const { list, isLoading, error } = useListQuery(queryKey, () =>
        sarairRequest.get<User[]>('users', params)
    )

    return {
        list,
        isLoading,
        error
    }
}
