import React, { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'

import './styles.css'

import { AppProviders } from './context'
import { App } from './app'

ReactDOM.render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
  document.getElementById('root')
)
