import React, { useState, useContext } from "react";
import { userContext } from "./Context"; // Global authentication context
import "./App.css";

/**
 * Coin_data.js: Full Conversion Rates for One Currency
 * Allows users to input a base currency to see all global exchange rates.
 * Restricted to logged-in users.
 */
export default function CoinData() {
  [span_2](start_span)// Accessing authentication status from global context[span_2](end_span)
  const { email, password, userName, click } = useContext(userContext);

  [span_3](start_span)// Local state for the base currency input and the resulting rates list[span_3](end_span)
  const [baseCurrency, setBaseCurrency] = useState("");
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);

  [span_4](start_span)// Function to fetch all conversion rates from ExchangeRate-API[span_4](end_span)
  const fetchAllRates = async () => {
    if (!baseCurrency) {
      alert("Please enter a base currency code.");
      return;
    }

    setLoading(true);
    const API_KEY = "YOUR_EXCHANGERATE_API_KEY"; [span_5](start_span)// Replace with your actual API key[span_5](end_span)
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.result === "success") {
        setRates(data); [span_6](start_span)// Stores the comprehensive conversion data[span_6](end_span)
      } else {
        alert("Error: " + data["error-type"]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to fetch data. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  [span_7](start_span)// Conditional Rendering: Check if user is logged in before showing page content[span_7](end_span)
  if (!(email && password && userName && click)) {
    return (
      <div className="auth-error">
        <h2>Access Denied</h2>
        <p>Please login first to view detailed currency data.</p>
      </div>
    );
  }

  return (
    <div className="coin-data-container">
      <h2>Full Conversion Rates</h2>
      <p>Enter a base currency code (e.g., USD, EUR, GBP) to see all live rates.</p>

      <div className="input-group">
        <input
          type="text"
          placeholder="Base Currency (e.g. USD)"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value.toUpperCase())}
        />
        <button onClick={fetchAllRates} disabled={loading}>
          {loading ? "Loading Rates..." : "Fetch Rates"}
        </button>
      </div>

      [span_8](start_span){/* Displaying the result metadata and the list of rates[span_8](end_span) */}
      {rates && (
        <div className="rates-results">
          <div className="metadata">
            <h3>Base: {rates.base_code}</h3>
            <p><strong>Last Update:</strong> {rates.time_last_update_utc}</p>
            <p><strong>Next Update:</strong> {rates.time_next_update_utc}</p>
          </div>
          
          <div className="rates-list">
            {Object.entries(rates.conversion_rates).map(([currency, value]) => (
              <div key={currency} className="rate-item">
                <strong>{currency}</strong>: {value.toFixed(4)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
