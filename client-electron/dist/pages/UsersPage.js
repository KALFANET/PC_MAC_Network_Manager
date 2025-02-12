"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const UserService_1 = require("../services/UserService");
const UsersPage = () => {
    const [users, setUsers] = (0, react_1.useState)([]);
    const [newUser, setNewUser] = (0, react_1.useState)({ name: "", email: "", password: "" });
    const [error, setError] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchUsers = async () => {
            try {
                setError(null);
                setIsLoading(true);
                const response = await UserService_1.userService.fetchUsers();
                setUsers(response.users);
            }
            catch (error) {
                console.error("Failed to fetch users:", error);
                setError("Failed to load users.");
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);
    const handleAddUser = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const addedUser = await UserService_1.userService.addUser(newUser.name, newUser.email, newUser.password);
            setUsers((prevUsers) => [...prevUsers, addedUser]);
            setNewUser({ name: "", email: "", password: "" });
        }
        catch (error) {
            console.error("Failed to add user:", error);
            setError("Failed to add user.");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleDeleteUser = async (userId) => {
        try {
            setError(null);
            setIsLoading(true);
            await UserService_1.userService.deleteUser(userId);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        }
        catch (error) {
            console.error("Failed to delete user:", error);
            setError("Failed to delete user.");
        }
        finally {
            setIsLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-bold mb-4", children: "Users Management" }), error && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: error }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Name", value: newUser.name, onChange: (e) => setNewUser({ ...newUser, name: e.target.value }), className: "border p-2 mr-2" }), (0, jsx_runtime_1.jsx)("input", { type: "email", placeholder: "Email", value: newUser.email, onChange: (e) => setNewUser({ ...newUser, email: e.target.value }), className: "border p-2 mr-2" }), (0, jsx_runtime_1.jsx)("input", { type: "password", placeholder: "Password", value: newUser.password, onChange: (e) => setNewUser({ ...newUser, password: e.target.value }), className: "border p-2 mr-2" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleAddUser, className: "bg-blue-600 text-white px-4 py-2 rounded", disabled: isLoading, children: isLoading ? "Adding..." : "Add User" })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: users.map((user) => ((0, jsx_runtime_1.jsxs)("div", { className: "border p-4 rounded shadow", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold", children: user.name }), (0, jsx_runtime_1.jsx)("p", { children: user.email }), (0, jsx_runtime_1.jsx)("button", { onClick: () => handleDeleteUser(user.id), className: "mt-2 bg-red-500 text-white px-4 py-2 rounded", disabled: isLoading, children: "Delete" })] }, user.id))) })] }));
};
exports.default = UsersPage;
//# sourceMappingURL=UsersPage.js.map