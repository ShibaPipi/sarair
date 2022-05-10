import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'

import App from './app/app'
import { TimeProvider } from './providers'

ReactDOM.render(
    <StrictMode>
        <TimeProvider>
            <App />
        </TimeProvider>
    </StrictMode>,
    document.getElementById('root')
)
