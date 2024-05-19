import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Redirect, Route, Switch } from "react-router-dom";
import { MealCheckoutPage } from "./layouts/MealCheckoutPage/MealCheckoutPage";
import { SearchMealsPage } from "./layouts/SearchMealsPage/SearchMealsPage";
import { LoginOrRegister } from "./Auth/LoginOrRegister";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchMealsPage />
          </Route>
          <Route path="/checkout/:mealId">
            <MealCheckoutPage />
          </Route>
          <Route path="/register">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <LoginOrRegister />
          </Route>
          {/* <Route path='/login' render={
            () => <LoginWidget config={oktaConfig} /> 
            } 
          />
          <Route path='/login/callback' component={LoginCallback} /> */}
        </Switch>
      </div>
      <Footer />
    </div>
  );
};
