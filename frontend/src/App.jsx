import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './context/authContext'
import PrivateRoute from './components/PrivateRoute'
import { pagesRoutes } from './api/routes'

import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NotFound from './pages/NotFound'
import ChatPage from './pages/ChatPage'

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          )}
        />
        <Route path={pagesRoutes.login()} element={<LoginPage />} />
        <Route path={pagesRoutes.signup()} element={<SignupPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)

export default App