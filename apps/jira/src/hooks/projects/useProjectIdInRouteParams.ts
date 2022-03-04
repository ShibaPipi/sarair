import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

export const useProjectIdInRouteParams = () => {
    const { id } = useParams<{ id: string }>()

    return useMemo(() => (id ? +id : undefined), [id])
}
