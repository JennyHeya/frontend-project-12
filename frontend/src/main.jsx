import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider, ErrorBoundary } from '@rollbar/react'
import Init from './init.jsx'
import rollbarConfig from './rollbarConfig.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <Init />
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)
