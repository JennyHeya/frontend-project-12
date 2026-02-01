import React, { createContext, useContext, useState, useEffect } from 'react'
import { rollbar } from '../rollbar.js'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [initialized, setInitialized] = useState(false)

  const logIn = (userData) => {
    console.log('=== logIn called ===')
    console.log('Raw userData:', userData)
    console.log('userData type:', typeof userData)
    console.log('userData keys:', userData ? Object.keys(userData) : 'null')
    
    // normalize response shape: some backends return { data: { token, username } }
    const payload = userData && userData.data ? userData.data : userData
    console.log('After first normalization:', payload)
    
    const normalized = typeof payload === 'string' ? { token: payload } : payload
    console.log('After second normalization:', normalized)
    console.log('Final normalized.token:', normalized?.token ? normalized.token.substring(0, 30) : 'MISSING')
    
    // persist and set user state
    try {
      localStorage.setItem('user', JSON.stringify(normalized))
      console.log('Saved to localStorage:', JSON.stringify(normalized))
    } catch (e) {
      // ignore storage errors
      // eslint-disable-next-line no-console
      console.error('Failed to persist user to localStorage', e)
    }
    setUser(normalized)
    setInitialized(true)
    if (rollbar && typeof rollbar.configure === 'function') {
      try {
        rollbar.configure({ payload: { person: { id: userData.username } } })
      } catch (e) {
        // don't let rollbar errors break auth flow
        // eslint-disable-next-line no-console
        console.error('Rollbar configure failed', e)
      }
    }
  }

  const logOut = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const getToken = () => {
    const userData = JSON.parse(localStorage.getItem('user'))
    return userData?.token
  }
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData && userData.token) {
      setUser(userData)
    }
    setInitialized(true)
  }, [])


  return (
    <AuthContext.Provider value={{ user, logIn, logOut, getToken, initialized }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

