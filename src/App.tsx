import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
