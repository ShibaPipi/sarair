import { useRequest } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'

import type { Health, HealthFormData } from '../models/health'

export const useKeepers = () => {
    const {
        data: list,
        loading: listLoading,
        error: listError,
        run: getList
    } = useRequest((params?: Partial<Health>) =>
        sarairRequest.get<Health[]>('keepers', params)
    )

    const {
        loading: createLoading,
        error: createError,
        runAsync: create
    } = useRequest(
        (formData: HealthFormData) => sarairRequest.post('keepers', formData),
        { manual: true, onSuccess: () => getList() }
    )

    return {
        list,
        loading: listLoading || createLoading,
        error: listError || createError,
        methods: { create }
    }
}
