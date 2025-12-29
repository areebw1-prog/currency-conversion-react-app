import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userContext } from "./Context"; // Shared state context
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Compare from "./Compare";
import CoinData from "./Coindata";
import "./App.css";

/**
 * App.js: The Root Component
 * This file imports all components and defines the global userContext.
 * It manages the routing for Home, Login, Compare, and Coin Data pages.
 */
export default function App() {
  [span_2](start_span)// Use useState to manage user input and authentication status[span_2](end_span)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [click, setClick] = useState(false); [span_3](start_span)// Indicates login status[span_3](end_span)

  return (
    <div className="App">
      [span_4](start_span){/* BrowserRouter wraps the app to enable URL routing[span_4](end_span).
        [span_5](start_span)[span_6](start_span)userContext.Provider allows global state sharing without prop drilling[span_5](end_span)[span_6](end_span).
      */}
      <BrowserRouter>
        <userContext.Provider value={{ 
          userName, setUserName, 
          password, setPassword, 
          email, setEmail, 
          click, setClick 
        }}>
          
          [span_7](start_span)<Header /> {/* Navigation bar visible on all pages[span_7](end_span) */}

          <Routes>
            [span_8](start_span)[span_9](start_span){/* Defining exact paths for each component[span_8](end_span)[span_9](end_span) */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/coin_data" element={<CoinData />} />
          </Routes>

        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
              }
