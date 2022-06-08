import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from 'react-query'

export const useListQuery = <
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
>(
    queryKey: TQueryKey,
    queryFn: QueryFunction<TQueryFnData[], TQueryKey>,
    options?: Omit<
        UseQueryOptions<TQueryFnData[], TError, TData[], TQueryKey>,
        'queryKey' | 'queryFn'
    >
) => {
    const res = useQuery(queryKey, queryFn, options)

    return { ...res, list: res.data || [] }
}
