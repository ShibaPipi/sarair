import { QueryKey, useQueryClient } from 'react-query'

export const useQueryConfig = <
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
>(
    queryKey: QueryKey,
    callback: (target: TVariables, old?: TData[]) => TData[]
) => {
    const queryClient = useQueryClient()

    return {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        onMutate: (target: TVariables) => {
            const previousItems = queryClient.getQueryData(queryKey)

            queryClient.setQueryData(queryKey, (old?: TData[]) => {
                return callback(target, old)
            })

            return { previousItems } as unknown as undefined
        },
        onError: (error: TError, variables: TVariables, context: TContext) => {
            queryClient.setQueryData(
                queryKey,
                (context as unknown as { previousItems: TData[] }).previousItems
            )
        }
    }
}
