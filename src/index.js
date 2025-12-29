import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

/**
 * index.js: The entry point of the React application.
 * It grabs the root element from the HTML and renders the main App component.
 */

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
