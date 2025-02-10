"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const Dashboard = () => {
    const [connectionStatus, setConnectionStatus] = (0, react_1.useState)("connected");
    return ((0, jsx_runtime_1.jsx)("div", { className: "h-screen bg-gray-100", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-80 bg-white rounded-lg shadow-lg overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-4 bg-gray-50 border-b flex justify-between items-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-5 w-5 text-blue-500" }), (0, jsx_runtime_1.jsx)("h1", { className: "text-sm font-medium", children: "Network Manager" })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "p-4 border-b", children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-between mb-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [connectionStatus === "connected" ? (0, jsx_runtime_1.jsx)(lucide_react_1.Wifi, { className: "text-green-500" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.WifiOff, { className: "text-red-500" }), (0, jsx_runtime_1.jsx)("span", { children: connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1) })] }) }) })] }) }));
};
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map