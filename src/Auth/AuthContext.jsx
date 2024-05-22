import React, { useState, useEffect, useContext } from "react";
import { setLocalStorage, getLocalStorage } from "./TokenHelper";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [authState, setAuthState] = useState(() =>
    getLocalStorage("authState", null)
  );

  useEffect(() => {
    setLocalStorage("authState", authState);
  }, [authState]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = {
    authState,
    setAuthState,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
