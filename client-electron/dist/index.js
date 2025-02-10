"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const react_router_dom_1 = require("react-router-dom");
const App_1 = __importDefault(require("./App"));
const DevicesPage_1 = __importDefault(require("./pages/DevicesPage"));
const SettingsPage_1 = __importDefault(require("./pages/SettingsPage"));
const root = client_1.default.createRoot(document.getElementById("root"));
root.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.HashRouter, { children: [" ", (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(App_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/devices", element: (0, jsx_runtime_1.jsx)(DevicesPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/settings", element: (0, jsx_runtime_1.jsx)(SettingsPage_1.default, {}) })] })] }) }));
//# sourceMappingURL=index.js.map