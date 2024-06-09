import React, { useState, useEffect, useContext } from "react";
import { getLocalStorage, login, logout } from "./TokenHelper";
import { CustomJwtPayload } from "../Auth/entity/CustomJwtPayload";
import { jwtDecode } from "jwt-decode";

const AuthContext = React.createContext<any | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props: any) => {
  const [authState, setAuthState] = useState(
    getLocalStorage("authState", null)
  );
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    getLocalStorage("authState", null) ? true : false
  );
  const [role, setRole] = useState<any>("MEMBER");

  useEffect(() => {
    if (!authState) {
      logout();
    } else {
      login("authState", authState);
      let decoded: CustomJwtPayload;
      (decoded = jwtDecode<CustomJwtPayload>(authState.token)) &&
        setRole(decoded?.role);

      console.log(decoded?.role);
    }
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
