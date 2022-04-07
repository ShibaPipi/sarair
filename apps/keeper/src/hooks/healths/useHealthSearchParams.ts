import { useUrlState } from '@sarair/shared/hooks'
import { KeeperEnum } from '../../models'

export const useHealthSearchParams = () => {
    const [{ name }, setUrlState] = useUrlState({ name: KeeperEnum.PDROL })

    return [{ name }, setUrlState] as const
}
