import React from "react";
import { Link } from "react-router-dom"; // Essential for single-page navigation
import "./App.css"; // Using global styles for consistent layout

/**
 * Header.js: Navigation Component
 * This component renders the navigation bar that remains visible across all pages.
 * It uses 'Link' to enable seamless transitions between routes.
 */
export default function Header() {
  return (
    <nav className="header-nav">
      <div className="nav-brand">
        <h1>CurrencyConv</h1>
      </div>
      <div className="nav-links">
        {/* Link components point to the routes defined in App.js */}
        <Link className="link-item" to="/">Home</Link>
        <Link className="link-item" to="/login">Login</Link>
        <Link className="link-item" to="/compare">Compare</Link>
        <Link className="link-item" to="/coin_data">Coin Data</Link>
      </div>
    </nav>
  );
}
