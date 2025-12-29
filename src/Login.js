import React, { useContext } from "react";
import { userContext } from "./Context"; // Accessing the global context defined in Context.js
import "./App.css"; // Using global styles for consistency

/**
 * Login.js: User Authentication Component
 * This component captures user credentials and updates the global state.
 * It simulates a login process without a backend.
 */
export default function Login() {
  // Destructuring values from userContext to read and update global state
  const { 
    setEmail, 
    setUserName, 
    setPassword, 
    setClick, 
    click,
    userName 
  } = useContext(userContext);

  // Handles form submission and toggles the login status
  const handleSubmit = (e) => {
    e.preventDefault();
    setClick(true); // Updates global 'click' state to true, enabling access to other pages
  };

  return (
    <div className="login-container">
      <h2>User Authentication</h2>
      
      {/* Conditional UI messages guide the user based on login status */}
      {click ? (
        <div className="success-section">
          <p className="success-msg">Welcome back, {userName}!</p>
          <p>You now have access to Home, Compare, and Coin Data pages.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Username" 
              onChange={(e) => setUserName(e.target.value)} 
              required 
            />
            <input 
              type="email" 
              placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="login-btn">Submit</button>
          
          <p className="hint">
            Note: All fields are required to enable access to protected data.
          </p>
        </form>
      )}
    </div>
  );
}
