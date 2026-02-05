// frontend/src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { ErrorBoundary } from '@rollbar/react'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import store from './store/index.js'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ModalProvider } from './components/modals/index.jsx'
import CustomErrorBoundary from './components/common/CustomErrorBoundary.jsx'
import { rollbar, isRollbarEnabled } from './rollbar.js'
import './i18n.js'
import leoProfanity from 'leo-profanity'

// eslint-disable-next-line no-console
console.log('[main] Starting app initialization')

// Add global error handlers for better debugging
window.addEventListener('error', (event) => {
  // eslint-disable-next-line no-console
  console.error('[global error]', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  // eslint-disable-next-line no-console
  console.error('[unhandled rejection]', event.reason)
})

leoProfanity.clearList()
leoProfanity.add(leoProfanity.getDictionary('ru'))

// eslint-disable-next-line no-console
console.log('[main] Creating React root and rendering app')

createRoot(document.getElementById('root')).render(
  <CustomErrorBoundary>
    <React.StrictMode>
      {isRollbarEnabled ? (
        <ErrorBoundary rollbar={rollbar}>
          <Provider store={store}>
            <AuthProvider>
              <ModalProvider>
                <BrowserRouter>
                  <App />
                  <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                </BrowserRouter>
              </ModalProvider>
            </AuthProvider>
          </Provider>
        </ErrorBoundary>
      ) : (
        <Provider store={store}>
          <AuthProvider>
            <ModalProvider>
              <BrowserRouter>
                <App />
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </BrowserRouter>
            </ModalProvider>
          </AuthProvider>
        </Provider>
      )}
    </React.StrictMode>
  </CustomErrorBoundary>
)

