import { useDeleteQueryConfig, useMutation } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'
import { useEpicListQueryKey } from './useEpicListQueryKey'

export const useEpicDelete = () => {
    const queryKey = useEpicListQueryKey()

    const { mutateAsync: remove } = useMutation(
        (id: number) => sarairRequest.delete(`epics/${id}`),
        useDeleteQueryConfig(queryKey)
    )

    return {
        methods: { remove }
    }
}
