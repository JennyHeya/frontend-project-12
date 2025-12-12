import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    if (window.rollbar) window.rollbar.configure({ payload: { person: { id: userData.username } } });
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
