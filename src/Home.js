import React, { useContext, useState } from "react";
import { userContext } from "./Context";
import "./App.css";

/**
 * Home.js: Fetches the full list of currency names using RapidAPI.
 */
export default function Home() {
  const { email, password, userName, click } = useContext(userContext);
  const [symbols, setSymbols] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchSymbols = async () => {
    setLoading(true);
    // Using the RapidAPI credentials you provided
    const url = "https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
        "x-rapidapi-key": "92499a197bmsh972c66ee05be7d5p1b39e8jsn790740eff152"
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      if (result.success) {
        setSymbols(result.symbols);
      } else {
        alert("API Error: Please check your RapidAPI subscription.");
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Access control check
  if (!(email && password && userName && click)) {
    return (
      <div className="auth-error">
        <h2>Access Denied</h2>
        <p>Please login to view the currency reference list.</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h2>Welcome, {userName}!</h2>
      <p>Use the button below to load the full list of global currency symbols.</p>
      
      <button onClick={fetchSymbols} disabled={loading}>
        {loading ? "Fetching Symbols..." : "Load Currency Directory"}
      </button>

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
          !loading && <p className="hint">No data loaded yet.</p>
        )}
      </div>
    </div>
  );
}
