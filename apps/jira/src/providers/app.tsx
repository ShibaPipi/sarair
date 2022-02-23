import React from 'react'
import { QueryClientProvider, useQueryClient } from 'react-query'
// import { Provider } from 'react-redux'

import { AuthProvider } from './auth'
// import { store } from '../store'

export const AppProviders: React.FC = ({ children }) => {
    const client = useQueryClient()

    return (
        // <Provider store={store}>
        <QueryClientProvider client={client}>
            <AuthProvider children={children} />
        </QueryClientProvider>
        // </Provider>
    )
}
