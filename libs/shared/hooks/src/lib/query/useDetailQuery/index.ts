import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from 'react-query'

export { useQuery } from 'react-query'

export const useDetailQuery = <
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
>(
    queryKey: TQueryKey,
    queryFn: QueryFunction<TQueryFnData, TQueryKey>,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
        'queryKey' | 'queryFn'
    >
) => {
    const res = useQuery(queryKey, queryFn, options)

    return { ...res, detail: res.data }
}
