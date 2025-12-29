import React, { useState, useContext } from "react";
import { userContext } from "./Context";
import "./App.css";

export default function CoinData() {
  const { email, password, userName, click } = useContext(userContext);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllRates = async () => {
    if (!baseCurrency) return alert("Enter a base code.");
    setLoading(true);
    // Integrated your API Key here
    const url = `https://v6.exchangerate-api.com/v6/7a483a888219f0bb309466b9/latest/${baseCurrency}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.result === "success") {
        setRates(data);
      } else {
        alert("Error: " + data["error-type"]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!(email && password && userName && click)) {
    return <div className="auth-error"><h2>Access Denied</h2><p>Please login first.</p></div>;
  }

  return (
    <div className="coin-data-container">
      <h2>Full Conversion Rates</h2>
      <div className="input-group">
        <input type="text" placeholder="Base (e.g. USD)" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value.toUpperCase())} />
        <button onClick={fetchAllRates} disabled={loading}>{loading ? "Loading..." : "Fetch Rates"}</button>
      </div>
      {rates && (
        <div className="rates-results">
          <h3>Base: {rates.base_code}</h3>
          <div className="rates-list">
            {Object.entries(rates.conversion_rates).map(([curr, val]) => (
              <div key={curr} className="rate-item"><strong>{curr}</strong>: {val.toFixed(4)}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
