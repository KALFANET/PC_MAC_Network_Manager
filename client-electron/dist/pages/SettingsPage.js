"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@headlessui/react");
const store_1 = __importDefault(require("../store"));
const api_1 = __importDefault(require("../services/api")); // ✅ שימוש נכון ב- `default export`
const SettingsPage = () => {
    const { status, updateStatus } = (0, store_1.default)();
    const [debugMode, setDebugMode] = (0, react_1.useState)(status.debugMode);
    const [autoUpdate, setAutoUpdate] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const [isChecking, setIsChecking] = (0, react_1.useState)(false); // ✅ משתנה חדש לחיווי טעינה
    /** ✅ עדכון `debugMode` כאשר הסטטוס משתנה */
    (0, react_1.useEffect)(() => {
        setDebugMode(status.debugMode);
    }, [status.debugMode]);
    /** ✅ שינוי מצב `debugMode` ושמירה ב-Store */
    const toggleDebugMode = () => {
        const newDebugMode = !debugMode;
        setDebugMode(newDebugMode);
        updateStatus({ debugMode: newDebugMode });
    };
    /** ✅ בדיקה אם יש עדכונים זמינים */
    const checkForUpdates = async () => {
        try {
            setIsChecking(true);
            setError(null);
            const response = await api_1.default.checkForUpdates();
            console.log("Update check response:", response);
            setAutoUpdate(response.autoUpdateEnabled);
        }
        catch (error) {
            console.error("Failed to check updates:", error);
            setError("Failed to check for updates.");
        }
        finally {
            setIsChecking(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-bold mb-4", children: "Settings" }), (0, jsx_runtime_1.jsx)("div", { className: "mb-4", children: (0, jsx_runtime_1.jsxs)("label", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsxs)(react_2.Switch, { checked: debugMode, onChange: toggleDebugMode, className: `${debugMode ? "bg-blue-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`, children: [(0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Enable Debug Mode" }), (0, jsx_runtime_1.jsx)("span", { className: `${debugMode ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition` })] }), (0, jsx_runtime_1.jsx)("span", { children: "Enable Debug Mode" })] }) }), (0, jsx_runtime_1.jsx)("button", { onClick: checkForUpdates, disabled: isChecking, className: `p-2 text-white rounded ${isChecking ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`, children: isChecking ? "Checking..." : "Check for Updates" }), error && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500 mt-2", children: error }), autoUpdate !== null && ((0, jsx_runtime_1.jsxs)("p", { className: "mt-2 text-gray-700", children: ["Auto-update is ", autoUpdate ? "enabled" : "disabled", "."] }))] }));
};
exports.default = SettingsPage;
//# sourceMappingURL=SettingsPage.js.map