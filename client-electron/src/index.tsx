import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import DevicesPage from "./pages/DevicesPage";
import SettingsPage from "./pages/SettingsPage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Router> {/* ✅ HashRouter במקום BrowserRouter */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
