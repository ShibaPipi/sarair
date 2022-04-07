import * as ReactDOM from 'react-dom'

import App from './app/app'
import { AppProviders } from './providers/app-providers'

ReactDOM.render(
    <AppProviders>
        <App />
    </AppProviders>,
    document.getElementById('root')
)
