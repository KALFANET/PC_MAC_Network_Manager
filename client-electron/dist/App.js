"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const store_1 = __importDefault(require("./store"));
const validation_1 = require("./services/validation");
const App = () => {
    const { status, currentDevice, checkConnection, refreshMetrics, executeCommand } = (0, store_1.default)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    /** ✅ פונקציה לבדיקת מצב הרשת */
    const checkStatus = (0, react_1.useCallback)(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const isConnected = await checkConnection();
            if (isConnected) {
                await refreshMetrics();
            }
        }
        catch (error) {
            console.error("Status check failed:", error);
            setError(error instanceof Error ? error.message : "Status check failed");
        }
        finally {
            setIsLoading(false);
        }
    }, [checkConnection, refreshMetrics]);
    /** ✅ שימוש ב-useEffect לבדיקה אוטומטית */
    (0, react_1.useEffect)(() => {
        checkStatus();
        const interval = setInterval(checkStatus, 60000);
        return () => clearInterval(interval);
    }, [checkStatus]);
    /** ✅ פונקציה להרצת פקודות */
    const handleCommand = async (cmd) => {
        try {
            if (typeof cmd !== "object" || cmd === null) {
                throw new Error("Invalid command format");
            }
            const validationResult = validation_1.validate.command(cmd);
            if (!validationResult.success) {
                throw new Error(validationResult.error.message);
            }
            const commandData = validationResult.data;
            await executeCommand(commandData);
        }
        catch (error) {
            console.error("Command execution failed:", error);
            setError(error instanceof Error ? error.message : "Command execution failed");
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-slate-100", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-bold", children: "Network Manager" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                            if (status.connected) {
                                refreshMetrics();
                            }
                            else {
                                console.warn("Cannot refresh metrics: No connection");
                            }
                        }, disabled: isLoading || !status.connected, className: "p-2 rounded hover:bg-slate-200 disabled:opacity-50", children: (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { className: `w-5 h-5 ${isLoading ? "animate-spin" : ""}` }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [status.connected ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Wifi, { className: "text-green-500" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.WifiOff, { className: "text-red-500" })), (0, jsx_runtime_1.jsx)("span", { children: status.connected ? "Connected" : "Disconnected" })] }), error && ((0, jsx_runtime_1.jsx)("div", { className: "mt-4 p-3 bg-red-100 border border-red-500 rounded text-red-500", children: error }))] })] }));
};
exports.default = App;
//# sourceMappingURL=App.js.map