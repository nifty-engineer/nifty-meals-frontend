import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Redirect, Route, Switch } from "react-router-dom";
import { MealCheckoutPage } from "./layouts/MealCheckoutPage/MealCheckoutPage";

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
          <Route path="/checkout/:mealId">
            <MealCheckoutPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};
