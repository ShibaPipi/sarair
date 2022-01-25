import { useListRequest } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'

import type { User } from '@sarair/shared/context'

export const useUserList = () => {
    const {
        list,
        loading,
        error,
        run: getList
    } = useListRequest((params?: Partial<User>) =>
        sarairRequest.get<User[]>('users', params)
    )

    return {
        list,
        loading,
        error,
        methods: {
            getList
        }
    }
}
