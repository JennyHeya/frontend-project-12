// frontend/src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify' // в†ђ РґРѕР±Р°РІСЊ
import { ErrorBoundary } from '@rollbar/react'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css' // РґР»СЏ РёРєРѕРЅРѕРє РІ РґСЂРѕРїРґР°СѓРЅРµ
import store from './store/index.js'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ModalProvider } from './components/modals/index.jsx'
import { rollbar } from './rollbar.js'
import './i18n.js' // в†ђ РїСЂРѕСЃС‚Рѕ РёРјРїРѕСЂС‚РёСЂСѓРµРј
import leoProfanity from 'leo-profanity'

leoProfanity.clearList()
leoProfanity.add(leoProfanity.getDictionary('ru'))

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary rollbar={rollbar}>
      <Provider store={store}>
        <AuthProvider>
          <ModalProvider>
            <BrowserRouter>
              <App />
              <ToastContainer // в†ђ РІРѕС‚ РѕРЅ, РєСЂР°СЃРёРІС‹Рµ СѓРІРµРґРѕРјР»РµРЅРёСЏ
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
  </React.StrictMode>
)

