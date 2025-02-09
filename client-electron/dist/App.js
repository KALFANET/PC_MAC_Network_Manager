import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useCallback } from "react";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import useSystemStore from "./store";
import { validate } from "./services/validation";
const App = () => {
    const { status, currentDevice, checkConnection, refreshMetrics, executeCommand } = useSystemStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    /** ✅ פונקציה לבדיקת מצב הרשת */
    const checkStatus = useCallback(async () => {
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
    useEffect(() => {
        checkStatus();
        const interval = setInterval(checkStatus, 60000);
        return () => clearInterval(interval);
    }, [checkStatus]);
    /** ✅ פונקציה להרצת פקודות */
    const handleCommand = async (cmd) => {
        try {
            const validationResult = validate.command(cmd);
            if (!validationResult.success) {
                throw new Error(validationResult.error.message);
            }
            // ✅ נוודא שהנתונים המוחזרים הם מהסוג הנכון
            const commandData = validationResult.data;
            await executeCommand(commandData);
        }
        catch (error) {
            console.error("Command execution failed:", error);
            setError(error instanceof Error ? error.message : "Command execution failed");
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-slate-100", children: [_jsxs("div", { className: "flex items-center justify-between p-4", children: [_jsx("h1", { className: "text-xl font-bold", children: "Network Manager" }), _jsx("button", { onClick: refreshMetrics, disabled: isLoading || !status.connected, className: "p-2 rounded hover:bg-slate-200 disabled:opacity-50", children: _jsx(RefreshCw, { className: `w-5 h-5 ${isLoading ? 'animate-spin' : ''}` }) })] }), _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [status.connected ? (_jsx(Wifi, { className: "text-green-500" })) : (_jsx(WifiOff, { className: "text-red-500" })), _jsx("span", { children: status.connected ? "Connected" : "Disconnected" })] }), error && (_jsx("div", { className: "mt-4 p-3 bg-red-100 border border-red-500 rounded text-red-500", children: error }))] })] }));
};
export default App;
//# sourceMappingURL=App.js.map