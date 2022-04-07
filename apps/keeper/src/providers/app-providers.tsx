import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export const AppProviders: FC = ({ children }) => {
    const client = new QueryClient()

    return <QueryClientProvider children={children} client={client} />
}
