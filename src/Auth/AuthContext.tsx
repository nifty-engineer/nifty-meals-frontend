import React, { useState, useEffect, useContext } from "react";
import { getLocalStorage, login, logout } from "./TokenHelper";
import { CustomJwtPayload } from "../Auth/entity/CustomJwtPayload";
import { jwtDecode } from "jwt-decode";

const AuthContext = React.createContext<any | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props: any) => {
  const [authState, setAuthState] = useState(() =>
    getLocalStorage("authState", null)
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<any>("MEMBER");

  let decoded: CustomJwtPayload;
  useEffect(() => {
    login("authState", authState);
    authState.token === undefined
      ? logout()
      : (decoded = jwtDecode<CustomJwtPayload>(authState?.token));
    setRole(decoded?.role);
    console.log(decoded?.role);
  }, [authState]);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    authState,
    setAuthState,
    role,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
