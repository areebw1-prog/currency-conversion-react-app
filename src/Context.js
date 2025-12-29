import { createContext } from "react";

/**
 * Context.js: Global State Management Setup
 * Defines and exports the userContext which acts as a global store.
 * [span_3](start_span)[span_4](start_span)This context will hold data like email, password, userName, and the login toggle (click)[span_3](end_span)[span_4](end_span).
 */

// Initialize the context with a default value of null
export const userContext = createContext(null);
