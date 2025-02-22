import React, { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, ouUserStateChange, auth } from '../api/firebase';
import { getRedirectResult } from 'firebase/auth';
const AuthContext = createContext();
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    ouUserStateChange((user) => {
      console.log('변화된User', user);
      setUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, login, logout, uid: user && user.uid }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
