import React, { useState, useEffect, useContext } from "react";
import { getLocalStorage, login, logout } from "./TokenHelper";

const AuthContext = React.createContext<any | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props: any) => {
  const [authState, setAuthState] = useState(() =>
    getLocalStorage("authState", null)
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    login("authState", authState);
  }, [authState]);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    authState,
    setAuthState,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
