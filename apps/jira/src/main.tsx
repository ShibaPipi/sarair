import React, { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'

import { AppProviders } from './context'
import App from './app/app'

ReactDOM.render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
  document.getElementById('root')
)
