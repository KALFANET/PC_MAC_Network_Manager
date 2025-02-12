"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const store_1 = __importDefault(require("./store")); // לוודא שהייבוא נכון
const Dashboard_1 = __importDefault(require("./components/Dashboard"));
const DevicesPage_1 = __importDefault(require("./pages/DevicesPage"));
const Performance_1 = __importDefault(require("./pages/Performance"));
const UsersPage_1 = __importDefault(require("./pages/UsersPage"));
const RemoteControl_1 = __importDefault(require("./pages/RemoteControl"));
const Settings_1 = __importDefault(require("./pages/Settings"));
const App = () => {
    const { device = [], updatedevice } = (0, store_1.default)((state) => ({
        device: state.device,
        updatedevice: state.updatedevice, // הפונקציה לעדכון המכשירים
    }));
    const [sidebarOpen, setSidebarOpen] = (0, react_1.useState)(true);
    const [currentPage, setCurrentPage] = (0, react_1.useState)('dashboard');
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: lucide_react_1.Layout },
        { id: 'devices', label: 'Devices', icon: lucide_react_1.Monitor },
        { id: 'performance', label: 'Performance', icon: lucide_react_1.Activity },
        { id: 'software', label: 'Software', icon: lucide_react_1.Package },
        { id: 'remote', label: 'Remote Control', icon: lucide_react_1.Terminal },
        { id: 'users', label: 'Users', icon: lucide_react_1.Users },
        { id: 'settings', label: 'Settings', icon: lucide_react_1.Settings }
    ];
    // קריאת המידע על המכשירים מה-API
    (0, react_1.useEffect)(() => {
        axios_1.default.get('/api/devices')
            .then(response => {
            updatedevice(response.data.devices); // עדכון המכשירים ב-store עם המידע שהתקבל מה-API
        })
            .catch(error => {
            console.error('Error fetching devices:', error);
        });
    }, [updatedevice]);
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex h-screen bg-gray-100", children: [(0, jsx_runtime_1.jsxs)("div", { className: `${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r flex flex-col transition-all duration-300`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-4 border-b flex items-center justify-between", children: [sidebarOpen ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Layout, { className: "h-6 w-6 text-blue-600" }), (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: "Network Manager" })] })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Layout, { className: "h-6 w-6 text-blue-600 mx-auto" })), (0, jsx_runtime_1.jsx)("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "p-1 hover:bg-gray-100 rounded-lg", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { className: "h-4 w-4" }) })] }), (0, jsx_runtime_1.jsx)("nav", { className: "flex-1 p-4 space-y-2", children: menuItems.map(item => ((0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: `/${item.id}`, onClick: () => setCurrentPage(item.id), className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${currentPage === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`, children: [(0, jsx_runtime_1.jsx)(item.icon, { className: "h-5 w-5" }), sidebarOpen && (0, jsx_runtime_1.jsx)("span", { children: item.label })] }, item.id))) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col overflow-hidden", children: [(0, jsx_runtime_1.jsx)("header", { className: "bg-white border-b h-16", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between px-6 h-full", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-semibold", children: menuItems.find(item => item.id === currentPage)?.label }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-4", children: (0, jsx_runtime_1.jsx)("div", { className: "relative", children: (0, jsx_runtime_1.jsxs)("button", { className: "p-2 hover:bg-gray-100 rounded-lg relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { className: "absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" })] }) }) })] }) }), (0, jsx_runtime_1.jsx)("main", { className: "flex-1 overflow-auto p-6", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: device.length > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/devices", element: (0, jsx_runtime_1.jsx)(DevicesPage_1.default, { devices: device }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dashboard", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, { devices: device }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/performance", element: (0, jsx_runtime_1.jsx)(Performance_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/users", element: (0, jsx_runtime_1.jsx)(UsersPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/remote", element: (0, jsx_runtime_1.jsx)(RemoteControl_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/settings", element: (0, jsx_runtime_1.jsx)(Settings_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, { devices: device }) })] })) : ((0, jsx_runtime_1.jsx)("p", { children: "\u05D8\u05E2\u05D9\u05E0\u05EA \u05DE\u05DB\u05E9\u05D9\u05E8\u05D9\u05DD..." })) }) })] })] }) }));
};
exports.default = App;
//# sourceMappingURL=App.js.map