import React, { useState, useEffect, useContext } from "react";
import { userContext } from "./Context";
import "./App.css";

export default function Compare() {
  const { email, password, userName, click } = useContext(userContext);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [result, setResult] = useState(null);
  const [submitToggle, setSubmitToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (submitToggle && baseCurrency && targetCurrency) {
      async function fetchPairRate() {
        setLoading(true);
        // Integrated your API Key here
        const url = `https://v6.exchangerate-api.com/v6/7a483a888219f0bb309466b9/pair/${baseCurrency}/${targetCurrency}`;

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
          setSubmitToggle(false);
        }
      }
      fetchPairRate();
    }
  }, [submitToggle, baseCurrency, targetCurrency]);

  if (!(email && password && userName && click)) {
    return <div className="auth-error"><h2>Access Restricted</h2><p>Please login first.</p></div>;
  }

  return (
    <div className="compare-container">
      <h2>Compare Currencies</h2>
      <div className="input-group">
        <input type="text" placeholder="Base (e.g., USD)" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value.toUpperCase())} />
        <input type="text" placeholder="Target (e.g., INR)" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value.toUpperCase())} />
        <button onClick={() => setSubmitToggle(true)} disabled={loading}>{loading ? "Fetching..." : "Compare"}</button>
      </div>
      {result && (
        <div className="result-section">
          <h3>1 {result.base_code} = {result.conversion_rate} {result.target_code}</h3>
          <p>Last Updated: {result.time_last_update_utc}</p>
        </div>
      )}
    </div>
  );
}
