import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const Navbar = () => {
  const history = useHistory();
  const { authState, isAuthenticated, setIsAuthenticated, role, logout } =
    useAuth();

  // if (!authState) {
  //   return <SpinnerLoading />;
  // }

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    <li className="nav-item m-1">
      <Link type="button" className="btn btn-outline-light" to="/login">
        Login/Register
      </Link>
    </li>;
    history.push("/#");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <span className="navbar-brand">nifty-meals</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search Meals
              </NavLink>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  My Meals
                </NavLink>
              </li>
            )}
            {isAuthenticated && role === "ADMIN" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated ? (
              <li className="nav-item m-1">
                <Link
                  type="button"
                  className="btn btn-outline-light"
                  to="/login"
                >
                  Login/Register
                </Link>
              </li>
            ) : (
              <li>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
