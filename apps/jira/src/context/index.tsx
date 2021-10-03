import React from 'react'

import { AuthProvider } from '@sarair/shared/providers'

export const AppProviders: React.FC = ({ children }) => {
  return <AuthProvider children={children} />
}
