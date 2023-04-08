import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// inject everything from App.js into #root element of index.html
// and style everything within App.js with rules from index.css
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
