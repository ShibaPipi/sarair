import useUrlState from '@ahooksjs/use-url-state'

export const useProjectSearchParams = () => {
    const [{ name, personId }, setParam] = useUrlState({
        name: '',
        personId: ''
    })

    return [{ name, personId: +personId || undefined }, setParam] as const
}
