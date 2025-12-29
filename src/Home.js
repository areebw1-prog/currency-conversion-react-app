import React, { useContext, useState } from "react";
import { userContext } from "./Context"; // Accessing global user authentication state
import "./App.css";

/**
 * Home.js: Welcome and Currency Symbols Page
 * This page displays a welcome message and fetches currency symbol data.
 * Access is restricted to logged-in users only.
 */
export default function Home() {
  // Accessing the shared login state and user details from Context
  const { email, password, userName, click } = useContext(userContext);
  
  const [symbols, setSymbols] = useState({}); // Stores the fetched currency data
  const [loading, setLoading] = useState(false); // Manages the loading message state

  // Function to fetch currency symbols from an external API via RapidAPI
  const fetchSymbols = async () => {
    setLoading(true);
    const url = "https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "YOUR_ACTUAL_RAPIDAPI_KEY", // Replace with your RapidAPI key
        "X-RapidAPI-Host": "currency-conversion-and-exchange-rates.p.rapidapi.com"
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      // If the API call is successful, update the symbols state
      if (result.success) {
        setSymbols(result.symbols);
      } else {
        console.error("API Error:", result.error);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Conditional Rendering: Only accessible if user is logged in (click is true)
  if (!(email && password && userName && click)) {
    return (
      <div className="auth-error">
        <h2>Access Denied</h2>
        <p>Please navigate to the Login page and enter your credentials first.</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h2>Welcome, {userName}!</h2>
      <p>Here you can view a comprehensive list of all supported currency codes and their full names.</p>
      
      {/* Button to trigger the asynchronous API fetch */}
      <button onClick={fetchSymbols} disabled={loading}>
        {loading ? "Fetching Data..." : "ADD (Fetch Symbols)"}
      </button>

      {/* Displays the list of currency symbols post-fetch */}
      <div className="symbol-results">
        {Object.keys(symbols).length > 0 ? (
          <div className="symbol-grid">
            {Object.entries(symbols).map(([code, name]) => (
              <div key={code} className="symbol-item">
                <strong>{code}</strong>: {name}
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="hint">Click "ADD" to load the currency reference list.</p>
        )}
      </div>
    </div>
  );
}
