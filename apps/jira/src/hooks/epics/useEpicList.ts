import { useListQuery } from '@sarair/shared/hooks/react-query'
import { sarairRequest } from '@sarair/shared/request'
import { useEpicDelete, useEpicListQueryKey } from '.'

import type { Epic } from '../../types'

export const useEpicList = (params?: Partial<Epic>) => {
    const queryKey = useEpicListQueryKey()

    const { isLoading, error, list } = useListQuery(queryKey, () =>
        sarairRequest.get<Epic[]>('epics', params)
    )

    const {
        methods: { remove }
    } = useEpicDelete()

    return {
        list,
        isLoading,
        error,
        methods: { remove }
    }
}
