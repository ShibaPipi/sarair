import { useDeleteQueryConfig, useMutation } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { useBoardListQueryKey } from './useBoardListQueryKey'

export const useBoardDelete = () => {
    const queryKey = useBoardListQueryKey()

    const { mutateAsync: remove } = useMutation(
        ({ id }: { id: number }) => sarairRequest.delete(`boards/${id}`),
        useDeleteQueryConfig(queryKey)
    )

    return {
        methods: { remove }
    }
}
