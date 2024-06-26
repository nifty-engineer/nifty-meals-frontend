import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const AuthenticatedRoute = (props) => {
  const { authState, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return <Route {...props} />;
};
