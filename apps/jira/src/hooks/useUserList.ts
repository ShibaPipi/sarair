import { useEffect } from 'react'

import { useAsync } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'

import type { User } from '@sarair/shared/context'

export const useUserList = (params?: Partial<User>) => {
    const {
        methods: { run },
        ...result
    } = useAsync<User[]>()

    useEffect(() => {
        run(sarairRequest.get<User[]>('users', params))
    }, [params, run])

    return result
}
