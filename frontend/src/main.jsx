// frontend/src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify'; // ← добавь
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // для иконок в дропдауне
import store from './store/index.js';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ModalProvider } from './components/modals/index.jsx';
import './i18n.js'; // ← просто импортируем
import leoProfanity from 'leo-profanity';

leoProfanity.clearList();
leoProfanity.add(leoProfanity.getDictionary('ru'));

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ModalProvider>
          <BrowserRouter>
            <App />
            <ToastContainer // ← вот он, красивые уведомления
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
  </React.StrictMode>
)
