"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const store_1 = __importDefault(require("../store")); // ✅ שימוש בסטור (אם צריך)
const api_1 = __importDefault(require("../services/api")); // ✅ ייבוא נכון של `endpoints`
const DevicesPage = () => {
    const { updateDevices, devices } = (0, store_1.default)();
    const [error, setError] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchDevices = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await api_1.default.fetchDevices();
                if (!response || !response.devices) {
                    throw new Error("No devices found.");
                }
                updateDevices(response.devices);
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
    }, [updateDevices]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-bold mb-4", children: "Devices" }), isLoading && (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "Loading devices..." }), error && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: error }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: devices.length > 0 ? (devices.map((device) => ((0, jsx_runtime_1.jsxs)("div", { className: "border p-4 rounded shadow", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold", children: device.name }), (0, jsx_runtime_1.jsx)("p", { className: device.status === "online" ? "text-green-500" : "text-red-500", children: device.status === "online" ? "Online" : "Offline" })] }, device.id)))) : (!isLoading && (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "No devices available." })) })] }));
};
exports.default = DevicesPage;
//# sourceMappingURL=DevicesPage.js.map