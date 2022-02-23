import React from 'react'
import { Provider } from 'react-redux'

import { AuthProvider } from './auth'
import { store } from '../store'

export const AppProviders: React.FC = ({ children }) => {
    return (
        <Provider store={store}>
            <AuthProvider children={children} />
        </Provider>
    )
}
