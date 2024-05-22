import React, { useState } from "react";
import "../App.css";

import person_icon from "../Images/LoginOrRegisterImages/person.png";
import email_icon from "../Images/LoginOrRegisterImages/email.png";
import password_icon from "../Images/LoginOrRegisterImages/password.png";
import { useHistory } from "react-router-dom";
import AuthnRequestModel from "../models/AuthnRequestModel";
import { useAuth } from "./AuthContext";

export const LoginOrRegister = () => {
  const { setAuthState, isAuthenticated, setIsAuthenticated } = useAuth();
  const [action, setAction] = useState("Login");

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const history = useHistory();

  async function fetchToken() {
    const baseUrl = `http://localhost:8080/api/${action.toLowerCase()}`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new AuthnRequestModel(email, password, userName)),
    };

    const authnResponse = await fetch(baseUrl, requestOptions);
    if (!authnResponse.ok) {
      throw new Error("Something went wrong!");
    }

    const authData = await authnResponse.json();

    setAuthState({
      name: authData.userName,
      email: authData.userEmail,
      token: authData.token,
    });
  }

  // Function to validate user name
  function validateUserName(userName: string) {
    let isUserNameValid = true;
    const nameRegex = /^[a-zA-Z0-9]+$/;
    if (userName === "") {
      setUserNameError("User name cannot be blank");
      isUserNameValid = false;
      return isUserNameValid;
    }
    if (!nameRegex.test(userName)) {
      setUserNameError(
        "Your name should not contain special characters or spaces"
      );
      isUserNameValid = false;
      return isUserNameValid;
    }
    return isUserNameValid;
  }

  // Function to validate email
  function validateEmail(email: string) {
    // const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let isEmailValid = true;

    if (email === "") {
      setEmailError("Email cannot be blank");
      isEmailValid = false;
      return isEmailValid;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Email address format is invalid");
      isEmailValid = false;
      return isEmailValid;
    }
    return isEmailValid;
  }

  // Function to validate password
  function validatePassword(password: string) {
    let isPasswordValid = true;
    if (password === "") {
      setPasswordError("Password cannot be blank");
      isPasswordValid = false;
      return isPasswordValid;
    }
    return isPasswordValid;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    let isUserNameValid = validateUserName(userName);
    let isEmailValid = validateEmail(email);
    let isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      alert("Form data is incorrect");
    } else {
      fetchToken();
      setIsAuthenticated(true);
      history.push("/home");
    }
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-header">
        <div className="form-text">{action}</div>
        <div className="form-underline"></div>
      </div>
      <div className="form-groups">
        {action === "Register" && (
          <div>
            <div className="form-group">
              <img src={person_icon} alt="" />
              <input
                type="text"
                placeholder="User Name"
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            {userNameError && <p className="error">{userNameError}</p>}
          </div>
        )}
        <div>
          <div className="form-group">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email (example@email.com)"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div>
          <div className="form-group">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
      </div>
      <div className="submit-container">
        <button
          type="submit"
          className={action === "Register" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </button>
        <button
          type="submit"
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Register")}
        >
          Register
        </button>
      </div>
    </form>
  );
};
