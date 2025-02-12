import React, { useEffect, useState } from "react";
import { userService } from "../services/UserService";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<{ id: string; name: string; email: string }[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await userService.fetchUsers();
        setUsers(response.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError("Failed to load users.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const addedUser = await userService.addUser(newUser.name, newUser.email, newUser.password);
      setUsers((prevUsers) => [...prevUsers, addedUser]);
      setNewUser({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Failed to add user:", error);
      setError("Failed to add user.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await userService.deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
      setError("Failed to delete user.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users Management</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add User"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p>{user.email}</p>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;