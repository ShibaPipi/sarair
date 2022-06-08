import { useListQuery, useMutation } from '@sarair/shared/hooks/react-query'
import { sarairRequest } from '@sarair/shared/request'
import { useBoardListQueryKey, useBoardReorderConfig } from '.'

import type { Board, SortProps } from '../../types'

export const useBoardList = (params?: Partial<Board>) => {
    const queryKey = useBoardListQueryKey()

    const { isLoading, error, list } = useListQuery(queryKey, () =>
        sarairRequest.get<Board[]>('boards', params)
    )

    const { mutateAsync: reorder } = useMutation(
        (params: SortProps) => sarairRequest.post('board/reorder', params),
        useBoardReorderConfig(queryKey)
    )

    return {
        list,
        isLoading,
        error,
        methods: { reorder }
    }
}
