import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";

function App() {
  return <div className="App">Welcome to nifty-meals :-)</div>;
}

export default App;
