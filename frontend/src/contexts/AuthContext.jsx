import React, { createContext, useContext, useState, useEffect } from 'react';
import { rollbar } from '../rollbar.js';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    if (rollbar && typeof rollbar.configure === 'function') {
      try {
        rollbar.configure({ payload: { person: { id: userData.username } } });
      } catch (e) {
        // don't let rollbar errors break auth flow
        // eslint-disable-next-line no-console
        console.error('Rollbar configure failed', e);
      }
    }
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getToken = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    return userData?.token;
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.token) {
      setUser(userData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)
