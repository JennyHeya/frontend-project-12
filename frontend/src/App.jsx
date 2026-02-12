import { useState, useMemo, useCallback } from 'react'
import {
  Routes, Route, Navigate, BrowserRouter,
} from 'react-router-dom'

import { useAuth } from './hooks/index.js'
import { AuthContext } from './context/index.js'
import { pagesRoutes } from './api/routes'

import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NotFound from './pages/NotFound'
import ChatPage from './pages/ChatPage'

const AuthProvider = ({ children }) => {
  const savedData = localStorage.getItem('userId') ?? ''
  const username = savedData ? JSON.parse(savedData).username : ''
  const [loggedIn, setLoggedIn] = useState(!!savedData)
  const [user, setUser] = useState({ username })
  const [authError, setError] = useState('')

  const logIn = useCallback(() => setLoggedIn(true), [])
  const logOut = useCallback(() => {
    localStorage.removeItem('userId')
    setLoggedIn(false)
  }, [])

  const addUser = useCallback(currentUser => setUser(currentUser), [])
  const getUser = useCallback(() => user, [user])

  const updateAuthError = useCallback(err => setError(err), [])

  const authData = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    addUser,
    getUser,
    authError,
    updateAuthError,
  }), [loggedIn, logIn, logOut, addUser, getUser, authError, updateAuthError])

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  )
}

const PrivateRoute = ({ children }) => {
  const auth = useAuth()

  return auth.loggedIn ? children : <Navigate to={pagesRoutes.login()} />
}

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
