import { useCallback, useEffect } from 'react'

import { useAsync } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'

import type { HealthItem } from '../types/health'

export const useKeepers = () => {
  const {
    methods: { run },
    ...result
  } = useAsync<HealthItem[]>()

  const getList = useCallback(
    (params?: Partial<HealthItem>) => {
      run(sarairRequest.get<HealthItem[]>('keepers', params))
    },
    [run]
  )

  useEffect(() => {
    getList()
  }, [getList])

  return {
    ...result,
    methods: {
      getList
    }
  }
}
