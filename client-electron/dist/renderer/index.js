"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./styles.css");
const App = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto p-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold mb-4", children: "PC MAC Network Manager" }), (0, jsx_runtime_1.jsx)("p", { children: "\u05D1\u05E8\u05D5\u05DB\u05D9\u05DD \u05D4\u05D1\u05D0\u05D9\u05DD \u05DC\u05DE\u05E0\u05D4\u05DC \u05D4\u05E8\u05E9\u05EA!" })] }));
};
const root = client_1.default.createRoot(document.getElementById('root'));
root.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(App, {}) }));
//# sourceMappingURL=index.js.map