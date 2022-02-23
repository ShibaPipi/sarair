import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { Provider } from 'react-redux'

import { AuthProvider } from './auth'
// import { store } from '../store'

export const AppProviders: React.FC = ({ children }) => {
    const client = new QueryClient()

    return (
        // <Provider store={store}>
        <QueryClientProvider client={client}>
            <AuthProvider children={children} />
        </QueryClientProvider>
        // </Provider>
    )
}
