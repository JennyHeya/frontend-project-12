import { createContext, useState, useMemo, useCallback } from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
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
