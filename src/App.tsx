import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Redirect, Route, Switch } from "react-router-dom";
import { MealCheckoutPage } from "./layouts/MealCheckoutPage/MealCheckoutPage";
import { SearchMealsPage } from "./layouts/SearchMealsPage/SearchMealsPage";
import { LoginOrRegister } from "./Auth/LoginOrRegister";
import { AuthProvider } from "./Auth/AuthContext";

export const App = () => {
  return (
    <AuthProvider className="d-flex flex-column min-vh-100">
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
        </Switch>
      </div>
      <Footer />
    </AuthProvider>
  );
};
