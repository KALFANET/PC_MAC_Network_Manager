"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const api_1 = require("../services/api");
const DevicesPage = ({ devices: initialDevices }) => {
    const [error, setError] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [devices, setDevice] = (0, react_1.useState)(initialDevices);
    (0, react_1.useEffect)(() => {
        const fetchDevices = async () => {
            try {
                setError(null);
                setIsLoading(true);
                const response = await api_1.endpoints.fetchDevices();
                setDevice(response);
            }
            catch (error) {
                console.error("Failed to fetch devices:", error);
                setError("Unable to load devices.");
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchDevices();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-bold mb-4", children: "Devices" }), isLoading && (0, jsx_runtime_1.jsx)("p", { children: "Loading devices..." }), error && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: error }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: devices.map((device) => ((0, jsx_runtime_1.jsxs)("div", { className: "border p-4 rounded shadow", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold", children: device.name }), (0, jsx_runtime_1.jsx)("p", { className: device.status === "online" ? "text-green-500" : "text-red-500", children: device.status === "online" ? "Online" : "Offline" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm", children: "CPU" }), (0, jsx_runtime_1.jsx)("div", { className: "w-full bg-gray-200 rounded-full", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-blue-500 h-2 rounded-full", style: { width: `${device.cpuUsage}%` } }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm", children: "RAM" }), (0, jsx_runtime_1.jsx)("div", { className: "w-full bg-gray-200 rounded-full", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-green-500 h-2 rounded-full", style: { width: `${device.ramUsage}%` } }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-2 flex justify-between", children: [(0, jsx_runtime_1.jsx)("button", { className: "bg-blue-600 text-white px-4 py-2 rounded", children: "Connect" }), (0, jsx_runtime_1.jsx)("button", { className: "bg-gray-500 text-white px-4 py-2 rounded", children: "Details" })] })] }, device.id))) })] }));
};
exports.default = DevicesPage;
//# sourceMappingURL=DevicesPage.js.map