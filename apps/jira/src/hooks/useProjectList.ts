import { useEffect } from 'react'

import { useAsync } from '@sarair/shared/hooks'
import { sarairRequest } from '@sarair/shared/request'

import type { Project } from '../types/project'

export const useProjectList = (params?: Partial<Project>) => {
  const {
    methods: { run },
    ...result
  } = useAsync<Project[]>()

  useEffect(() => {
    run(sarairRequest.get<Project[]>('projects', params))
  }, [params, run])

  return result
}
