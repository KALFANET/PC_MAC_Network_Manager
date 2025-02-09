import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Wifi, WifiOff, Activity } from "lucide-react";
const Dashboard = () => {
    const [connectionStatus, setConnectionStatus] = useState("connected");
    return (_jsx("div", { className: "h-screen bg-gray-100", children: _jsxs("div", { className: "w-80 bg-white rounded-lg shadow-lg overflow-hidden", children: [_jsx("div", { className: "p-4 bg-gray-50 border-b flex justify-between items-center", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Activity, { className: "h-5 w-5 text-blue-500" }), _jsx("h1", { className: "text-sm font-medium", children: "Network Manager" })] }) }), _jsx("div", { className: "p-4 border-b", children: _jsx("div", { className: "flex items-center justify-between mb-4", children: _jsxs("div", { className: "flex items-center gap-2", children: [connectionStatus === "connected" ? _jsx(Wifi, { className: "text-green-500" }) : _jsx(WifiOff, { className: "text-red-500" }), _jsx("span", { children: connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1) })] }) }) })] }) }));
};
export default Dashboard;
//# sourceMappingURL=Dashboard.js.map