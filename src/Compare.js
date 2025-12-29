import React, { useState, useEffect, useContext } from "react";
import { userContext } from "./Context"; // Global authentication context
import "./App.css";

/**
 * Compare.js: Currency Pair Conversion
 * Allows users to input a base and target currency to get the exchange rate.
 * Access is restricted to logged-in users.
 */
export default function Compare() {
  // Destructuring authentication status from global context
  const { email, password, userName, click } = useContext(userContext);

  // Local state for inputs and API response
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [result, setResult] = useState(null);
  const [submitToggle, setSubmitToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect triggers the API call when the submit button is clicked
  useEffect(() => {
    if (submitToggle && baseCurrency && targetCurrency) {
      async function fetchPairRate() {
        setLoading(true);
        // Using ExchangeRate-API for pair conversion logic
        const API_KEY = "YOUR_EXCHANGERATE_API_KEY"; 
        const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${baseCurrency}/${targetCurrency}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          
          if (data.result === "success") {
            setResult(data);
          } else {
            alert("Error: " + data["error-type"]);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
          setSubmitToggle(false); // Reset toggle after fetch
        }
      }
      fetchPairRate();
    }
  }, [submitToggle, baseCurrency, targetCurrency]);

  // Conditional Rendering: Check for login credentials
  if (!(email && password && userName && click)) {
    return (
      <div className="auth-error">
        <h2>Access Restricted</h2>
        <p>Please login to use the Currency Comparison tool.</p>
      </div>
    );
  }

  return (
    <div className="compare-container">
      <h2>Compare Currencies</h2>
      <p>Enter the codes (e.g., USD, EUR) to see the conversion rate.</p>

      <div className="input-group">
        <input
          type="text"
          placeholder="Base Currency (e.g., USD)"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value.toUpperCase())}
        />
        <input
          type="text"
          placeholder="Target Currency (e.g., INR)"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value.toUpperCase())}
        />
        <button onClick={() => setSubmitToggle(true)} disabled={loading}>
          {loading ? "Fetching Rate..." : "Compare"}
        </button>
      </div>

      {/* Displaying conversion results and timestamps */}
      {result && (
        <div className="result-section">
          <div className="result-card">
            <h3>1 {result.base_code} = {result.conversion_rate} {result.target_code}</h3>
            <p><strong>Last Update:</strong> {result.time_last_update_utc}</p>
            <p><strong>Next Update:</strong> {result.time_next_update_utc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
