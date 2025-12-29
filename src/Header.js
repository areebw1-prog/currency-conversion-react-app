import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

/**
 * Header.js: Navigation Component
 * This component provides the top navigation bar for the application.
 * It links to the routes defined in App.js.
 */
function Header() {
  return (
    <nav className="header-nav">
      <div className="nav-brand">
        <h1>Currency Tracker</h1>
      </div>
      <div className="nav-links">
        {/* Link components prevent page refresh and maintain React state */}
        <Link to="/" className="link-item">
          Home
        </Link>
        <Link to="/login" className="link-item">
          Login
        </Link>
        <Link to="/compare" className="link-item">
          Compare
        </Link>
        <Link to="/coin_data" className="link-item">
          Coin Data
        </Link>
      </div>
    </nav>
  );
}

export default Header;
