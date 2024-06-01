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
import { ReviewListPage } from "./layouts/MealCheckoutPage/ReviewListPage/ReviewListPage";
import { AuthenticatedRoute } from "./Auth/AuthenticatedRoute";
import { CartPage } from "./layouts/CartHistoryPage/CartPage";
import { MessagesPage } from "./layouts/MessagesPage/MessagesPage";
import { AdminPage } from "./layouts/AdminPage/AdminPage";

export const App = () => {
  return (
    <AuthProvider>
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
            <Route path="/reviewlist/:mealId">
              <ReviewListPage />
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
            <AuthenticatedRoute path="/cart">
              <CartPage />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/messages">
              <MessagesPage />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/admin">
              <AdminPage />
            </AuthenticatedRoute>
          </Switch>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};
