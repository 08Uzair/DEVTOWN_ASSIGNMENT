import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App.jsx";
import Auth from "./components/Auth.jsx";

import "./index.css";

import useAuthenticated from "./hooks/useAuthenticate.js";

function Root() {
  const { isAuthenticated } = useAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={isAuthenticated ? <App /> : <Navigate to="/auth" />}
        />

        {/* AUTH */}
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/" /> : <Auth />}
        />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
